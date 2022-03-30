import React from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Message from "./Message";
import Profile from "./Profile";

function Home({ socket, messages, roomData }) {
 
  return (
    <>
      <Sidebar roomData={roomData} />
      <Profile />
      <Chat messages={messages} />
      <Message socket={socket} />
    </>
  );
}

export default Home;
