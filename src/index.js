const path = require("path");
const http = require("http");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { generateMessage } = require("./utils/messages");
const {
  loginUser,
  removeUser,
  getUser,
  getUsersInRoom,
  signupUser,
} = require("./utils/users");
const { getRooms } = require("./utils/rooms");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Socket.io requirements config -to use socketIO we need to configure our express app
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 3001;

// app.use(express.static(path.join(__dirname, "build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });

app.get("/", (req, res) => {
  res.send("Server is up");
});
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DB_CREDENTIALS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected");
  }
);
app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await loginUser({
      email: email,
      password: password
    });
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const user = await signupUser({
      username: username,
      email: email,
      password: password,
    });
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

app.get("/home", async (req, res) => {
  try {
    console.log(req.body);
    //should be user
    const { email } = req.body;
    const rooms = await getRooms({    
      email: email,
    });
    res.send(rooms);
  } catch (error) {
    console.error(error);
  }
});

//io object is for any/every connection
//socket argument is for each instance
io.on("connection", (socket) => {
  socket.on("join", ({ email, username, password }, callback) => {
    // check if user exists- if not send to login.
    try {
      const user = loginUser({
        email: email,
        username: username,
        password: password,
      });

      socket.join(room);

      //Send welcome massage
      socket.emit("message", generateMessage("Welcome", "Admin"));

      //Send message to all other connection when a user is connecting (Instance is made)
      socket.broadcast
        .to(room)
        .emit("message", generateMessage(`${username} has joined the room`));
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      callback();
    } catch (error) {
      return callback(error.message);
    }
  });

  // Deliver massage from client to all other connections
  //The function of any event has a callback function acknowledging the event
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("profanity is not allowed");
    }
    if (message === "") {
      return callback("No empty texts");
    }
    // this line is for all connections to be updated
    io.to(user.room).emit("message", generateMessage(message, user.username));
    //if message is acknowledged and delivered run callback
    callback();
  });

  socket.on("sendLocation", ({ lat, long }, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      generateMessage(`https://google.com/maps?q=${lat},${long}`, user.username)
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.username} Has left`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port);
