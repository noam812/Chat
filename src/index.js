const path = require("path");
const http = require("http");
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { generateMessage } = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

const app = express();
app.use(cors());
//Socket.io requirements config -to use socketIO we need to configure our express app
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 3001;
const publicDirectory = path.join(__dirname, "client/chat/build");
app.use(express.static(publicDirectory));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "client", "chat", "build", "index.html")
  );
});

//io object is for any/every connection
//socket argument is for each instance
io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, callback) => {
    try {
      const user = addUser({
        id: socket.id,
        username: username,
        room: room,
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
      return callback("profanity is not allowd");
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

server.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
