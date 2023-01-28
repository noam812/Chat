require("dotenv").config();
const http = require("http");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/User");
const { generateMessage } = require("./utils/messages");
const {
  loginUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");
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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
      password: password,
    });
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new Error("email is required!");
  }
  if (!password) {
    throw new Error("password is required!");
  }

  User.register(
    { username: email.trim().toLowerCase() },
    password.trim(),
    function (err, user) {
      console.error(err);
      if (err) {
        console.error(err);
        res.redirect("/signup");
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log(user);
          res.redirect("/home");
        });
      }
    }
  );
});

const auth = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/login");
};

app.get("/home",  (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home");
  }
  res.redirect("/login");
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
