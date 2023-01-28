const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // for encryption

const MessageSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    encrypted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// define the virtual field `users`
MessageSchema.virtual("User", {
  ref: "User", // reference the User model
  localField: "username", // the field in the current schema
  foreignField: "id", // the field in the referenced model
});

MessageSchema.pre('find', function() {
  this.populate('room');
  this.populate('username');
  });
// pre-save method for encrypting the message
MessageSchema.pre("save", async function (next) {
  if (!this.encrypted) {
    this.message = await bcrypt.hash(this.message, 10);
    this.encrypted = true;
  }
  next();
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
