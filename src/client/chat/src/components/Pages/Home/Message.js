import React, { useState } from "react";
import { Socket } from "socket.io-client";
import Section from "../../Layout/Section";
import Button from "../../UI/Buttons/Button";
import Form from "../../UI/Forms/Form";
import FormInput from "./../../UI/Forms/FormInput";

function Message() {
  const [message, SetMessage] = useState("");

  const handleSubmit = () => {};
  return (
    <Section gridColumn={"2/7"} gridRow={"7/8"} flexDirection={"row"}>
      <Form width={"fit-content"}>
        <FormInput></FormInput>
        <Button>Send</Button>
      </Form>
      <Button>Location</Button>
    </Section>
  );
}

export default Message;
