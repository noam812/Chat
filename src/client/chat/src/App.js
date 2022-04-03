import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { io } from "socket.io-client";
import "./App.css";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [logged, setLogged] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io(
      `http://${
        process.env.NODE_ENV === "development"
          ? "localhost:3001"
          : window.location.host
      }`
    );
    setSocket(newSocket);
    //TODO Fix to one message event with different types (url/text)
    newSocket.on("message", (message) => {
      setMessages((x) => [...x, message]);
    });

    newSocket.on("locationMessage", (message) => {
      setMessages((x) => [...x, message]);
    });

    newSocket.on("roomData", (roomData) => {
      setRoomData(roomData);
    });
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
    if (logged) {
      navigate("/");
    }
  }, [logged, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route
          path={"/"}
          element={
            <Home roomData={roomData} socket={socket} messages={messages} />
          }
        />
        <Route
          path={"/login"}
          element={<Login socket={socket} hasLogged={() => setLogged(true)} />}
        />
      </Routes>
    </div>
  );
}

export default App;
