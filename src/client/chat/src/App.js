import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { io } from "socket.io-client";
import "./App.css";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = io(`http://localhost:3001`);
    setSocket(newSocket);
    console.log(newSocket);
    newSocket.on("message", (message) => setMessage(message));
    console.log(message);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <Routes>
        <Route
          path={"/"}
          element={<Home socket={socket} message={message} />}
        />
        <Route path={"/login"} element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
