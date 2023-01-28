import React, { useState } from "react";
import { StyledMessageSection } from "../../Layout/section.styled";
import { StyledButton } from "../../UI/Buttons/button.styled";

import Form from "../../UI/Forms/Form";
import { StyledTxtArea } from "../../UI/Forms/formInput.styled";
import { MdSend, MdLocationPin } from "react-icons/md";

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
        () => {}
      );
    });
  };

  return (
    <StyledMessageSection
      gridColumn={"1/7"}
      gridRow={"7/8"}
      flexDirection={"row"}
    >
      <Form onSubmit={handleSubmit} width={"fit-content"}>
        <StyledTxtArea
          value={message}
          onChange={(e) => {
            SetMessage(e.target.value);
          }}
        />

        <svg width="0" height="0">
          <linearGradient id="blue-gradient" x1="9%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#afbdff" offset="0%"></stop>
            <stop stopColor="#c2dbe2" offset="0%"></stop>
            <stop stopColor="#768eff" offset="0%"></stop>
          </linearGradient>
        </svg>
        <StyledButton type="submit">
          <MdSend style={{ fill: "url(#blue-gradient)" }} size={"30px"} />
        </StyledButton>
      </Form>
      <StyledButton onClick={handleLocation}>
        <MdLocationPin style={{ fill: "url(#blue-gradient)" }} size={"30px"} />
      </StyledButton>
    </StyledMessageSection>
  );
}

export default Message;
