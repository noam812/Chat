import React, { useState } from "react";
import Card from "../../UI/Cards/Card";
import { LoginCard } from "../../UI/Cards/card.styled";
import Form from "../../UI/Forms/Form";
import { LoginInput } from "../../UI/Forms/formInput.styled";
import { LoginButton } from "../../UI/Buttons/button.styled";
import axios from "axios"

function Login({ socket, hasLogged }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the Node.js backend to authenticate the user
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password
      });

      if (response.status !== 200) {
        throw new Error(response.data.error);
      }

        // Emit a "join" event to the Socket.IO server
        socket.emit("join", { username }, (error) => {
          if (error) {
            return alert(error);
          }
        });
      hasLogged();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <LoginCard flexDirection={"column"} justifyContent={"flex-start"}>
      <h1>Welcome</h1>
      <h2>Please Login</h2>
      <Form onSubmit={handleSubmit}>
        <label >Enter Username</label>
        <LoginInput
          type={"text"}
          value={username}
          onChange={handleUsername}
          required={true}
        />
        <label>Enter Password</label>
        <LoginInput
          type={"password"}
          onChange={handlePassword}
          value={password}
          required={true}
        />
        <LoginButton type={"submit"}>Login</LoginButton>
      </Form>
    </LoginCard>
  );
}

export default Login;