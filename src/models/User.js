const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 45,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`Email is invalid`);
        }
      },
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes(`password`)) {
          throw new Error("Change the word Password");
        }
      },
    },
    avatars: { type: Buffer },
    // tokens: [
    //   {
    //     token: { type: String, required: true },
    //   },
    // ],
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
      }
    ]
  },
  { timestamps: true }
);

UserSchema.virtual('Rooms', {
  ref: 'Room',
  localField: 'rooms',
  foreignField: '_id',
  justOne: false
  });


// toJSON get called automatically whenever JSON.stringify is called
// which is essentialy with every res.send;
UserSchema.methods.toJSON = function (req, res) {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatars;

  return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
  //Assign user instance
  const user = this;
  //Generate token
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  //Save to tokens array
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// mongoose has options to trigger middleware before or after events like save,validate.
// hash password before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified(`password`)) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//delete tasks when user removed

// UserSchema.pre("remove", async function (next) {
//   const user = this;
//   await task.deleteMany({ owner: user._id });
//   next();
// });

//This is important - this order structures mongoose to work with more functions - like statics and so on.
const User = mongoose.model("User", UserSchema);

module.exports = User;
