import React from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Message from "./Message";
import Profile from "./Profile";

function Home() {
  return (
    <>
      <Sidebar />
      <Profile />
      <Chat />
      <Message />
    </>
  );
}

export default Home;
