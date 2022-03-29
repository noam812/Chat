import React, { useState } from "react";
import Card from "../../UI/Cards/Card";
import Form from "../../UI/Forms/Form";
import FormInput from "../../UI/Forms/FormInput";
import Button from "../../UI/Buttons/Button";

function Login() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, room);
  };

  return (
    <Card flexDirection={"column"} justifyContent={"space-evenly"}>
      <Form onSubmit={handleSubmit}>
        <label style={{ margin: "1rem" }}>Enter Username</label>
        <FormInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <label style={{ margin: "1rem" }}>Enter Room</label>
        <FormInput
          onChange={(e) => setRoom(e.target.value)}
          value={room}
          required={true}
        />
        <Button type="submit">Login</Button>
      </Form>
    </Card>
  );
}

export default Login;
