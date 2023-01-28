const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

const UserSchema = new mongoose.Schema(
  {
    
    username: {
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
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.virtual("Rooms", {
  ref: "Room",
  localField: "rooms",
  foreignField: "_id",
  justOne: false,
});

// toJSON get called automatically whenever JSON.stringify is called
// which is essentialy with every res.send;

UserSchema.plugin(passportLocalMongoose);

// mongoose has options to trigger middleware before or after events like save,validate.
// hash password before saving

//delete tasks when user removed

// UserSchema.pre("remove", async function (next) {
//   const user = this;
//   await task.deleteMany({ owner: user._id });
//   next();
// });

//This is important - this order structures mongoose to work with more functions - like statics and so on.
const User = mongoose.model("User", UserSchema);
// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
  
passport.deserializeUser(User.deserializeUser());
module.exports = User;
