const User = require("../models/User");
const loginUser = async ({ email, password }) => {
  console.log({ email, password });
  //Validate data
  if (!email) {
    throw new Error("email is required!");
  }
  if (!password) {
    throw new Error("password is required!");
  }
  //Clean Data
  email = email.trim().toLowerCase();
  password = password.trim();
  //Check for existing user
  const existingUser = await User.findOne({ email });
  //Validate username
  if (existingUser) {
    if (existingUser.email === email) {
      return {
        error: "Email is already taken!",
      };
    }
  }
  return existingUser;
};

const signupUser = async ({ username, email, password }) => {
  console.log({ username, email, password });
  //Validate data
  if (!username) {
    throw new Error("username is required!");
  }
  if (!email) {
    throw new Error("email is required!");
  }
  if (!password) {
    throw new Error("password is required!");
  }
  //Clean Data
  username = username.trim().toLowerCase();
  email = email.trim().toLowerCase();
  password = password.trim();
  //Check for existing user
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  //Validate username
  if (existingUser) {
    if (existingUser.email === email) {
      return {
        error: "Email is already taken!",
      };
    }
    if (existingUser.username === username) {
      return {
        error: "Username is already taken!",
      };
    }
  }
  //Store user
  const user = new User({ username, email, password });
  await user.save();
  return user;
};

const removeUser = async (id) => {
  const user = await User.findOneAndDelete({ id });
  if (!user) {
    return { error: "User not found" };
  }
  return user;
};

const getUser = async (id) => {
  const user = await User.findOne({ id });
  if (!user) {
    return { error: "User not found" };
  }
  return user;
};

// const getUsersInRoom = async (room) => {
//   room = room.trim().toLowerCase();
//   const users = await User.find({ room });
//   return users;
// }

module.exports = {
  loginUser,
  removeUser,
  getUser,
  signupUser,
  // getUsersInRoom
};
