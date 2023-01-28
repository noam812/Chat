const User = require("../models/User");
const getRooms = async (email) => {
    try {
        const user = await User.findOne(email)
        const rooms = user.rooms;
        return rooms
    } catch (error) {
        console.error(error)
    }
};
module.exports = {
  getRooms,
};
