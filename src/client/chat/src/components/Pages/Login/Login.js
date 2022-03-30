import React, { useState } from "react";
import Card from "../../UI/Cards/Card";
import Form from "../../UI/Forms/Form";
import FormInput from "../../UI/Forms/FormInput";
import Button from "../../UI/Buttons/Button";
import { useNavigate } from "react-router";

function Login({ socket, hasLogged }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handleRoom = (e) => setRoom(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username, room);

    socket.emit("join", { username, room }, (error) => {
      if (error) {
        alert(error);
        navigate("/login");
      }
    });
    
    hasLogged()
    setUsername("");
    setRoom("");
  };

  return (
    <Card flexDirection={"column"} justifyContent={"space-evenly"}>
      <Form onSubmit={handleSubmit}>
        <label style={{ margin: "1rem" }}>Enter Username</label>
        <FormInput
          type={"text"}
          value={username}
          onChange={handleUsername}
          required={true}
        />
        <label style={{ margin: "1rem" }}>Enter Room</label>
        <FormInput
          type={"text"}
          onChange={handleRoom}
          value={room}
          required={true}
        />
        <Button type={"submit"}>Login</Button>
      </Form>
    </Card>
  );
}

export default Login;
