import React, { useState } from "react";
import Card from "../../UI/Cards/Card";
import Form from "../../UI/Forms/Form";
import FormInput from "../../UI/Forms/FormInput";
import Button from "../../UI/Buttons/Button";

function Login({ socket, hasLogged }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleUsername = (e) => setUsername(e.target.value);
  const handleRoom = (e) => setRoom(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("join", { username, room }, (error) => {
      if (error) {
        return alert(error);
      }
      hasLogged();
    });

    setUsername("");
    setRoom("");
  };

  return (
    <Card flexDirection={"column"} justifyContent={"flex-start"}>
      <h1>Welcome</h1>
      <h2>Create/Join room</h2>
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
