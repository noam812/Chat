import React, { useState } from "react";
import Section from "../../Layout/Section";
import Button from "../../UI/Buttons/Button";
import Form from "../../UI/Forms/Form";
import FormInput from "./../../UI/Forms/FormInput";

function Message({ socket }) {
  const [message, SetMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", message, (error) => {
      if (error) {
        alert(error);
      }
    });
    SetMessage("");
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      return alert("Browser does not support geolocation");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit(
        "sendLocation",
        {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
        () => {
          console.log("location Shared");
        }
      );
    });
  };

  return (
    <Section gridColumn={"2/7"} gridRow={"7/8"} flexDirection={"row"}>
      <Form onSubmit={handleSubmit} width={"fit-content"}>
        <FormInput
          value={message}
          onChange={(e) => {
            SetMessage(e.target.value);
          }}
        />
        <Button type="submit">Send</Button>
      </Form>
      <Button onClick={handleLocation}>Location</Button>
    </Section>
  );
}

export default Message;
