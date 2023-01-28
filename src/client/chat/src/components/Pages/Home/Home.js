import React from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Message from "./Message";
import Profile from "./Profile";

function Home({ socket, messages, roomData }) {
  return (
    <>
      {/* <Sidebar roomData={roomData} /> */}
      <Profile roomData={roomData} socket={socket} />
      <Chat roomData={roomData} socket={socket} messages={messages} />
      <Message socket={socket} />
    </>
  );
}

export default Home;
