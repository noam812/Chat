import React, { useRef, useEffect } from "react";
import Section from "./../../Layout/Section";
import MessageCard from "../../UI/Cards/MessageCard";

function Chat({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <Section gridColumn={"2/7"} gridRow={"1/7"} scrollable={"auto"}>
      {messages.map((msg, i) => {
        return (
          <MessageCard
            username={msg.username}
            text={msg.text}
            time={msg.createdAt}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </Section>
  );
}

export default Chat;
