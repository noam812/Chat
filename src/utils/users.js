const users = [];

const addUser = ({ id, username, room }) => {
  //Validate data
  if (!username || !room) {
     throw new Error( "username and room are required!")
    
  }
  //Clean Data
  room = room.trim().toLowerCase();
  username = username.trim().toLowerCase();
  //Check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  //Validate username
  if (existingUser) {
    return {
      error: "Username is already taken!",
    };
  }

  //Store user
  const user = { id, username, room };
  users.push(user);
  return  user ;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users[index];
  }
  return {
    error: "User not found",
  };
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  const usersInRoom = users.filter((user) => user.room === room);
  return usersInRoom;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
