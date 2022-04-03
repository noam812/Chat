const generateMessage = (text, username) => {
  //TODO return ID - 
  return { text, username, createdAt: new Date().getTime() };
};

module.exports = { generateMessage };
