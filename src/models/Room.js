const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

RoomSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "room",
});

RoomSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "rooms",
});

RoomSchema.pre('find', function() {
  this.populate('users').populate('messages');
});


const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
