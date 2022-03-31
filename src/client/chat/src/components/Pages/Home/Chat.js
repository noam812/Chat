import React, { useRef, useEffect } from "react";
import Section from "./../../Layout/Section";
import MessageCard from "../../UI/Cards/MessageCard";
import UserMessageCard from "../../UI/Cards/UserMessageCard";

function Chat({ messages, socket, roomData }) {
  const messagesEndRef = useRef(null);
  console.log(socket);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const user = roomData.users?.find((user) => {
    return user.id === socket.id;
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <Section gridColumn={"2/7"} gridRow={"1/7"} scrollable={"auto"}>
      {messages.map((msg, i) => {
        if (user?.username !== msg.username) {
          return (
            <MessageCard
              key={i}
              username={msg.username}
              text={msg.text}
              time={msg.createdAt}
            />
          );
        }
        return (   <UserMessageCard
          key={i}
          username={msg.username}
          text={msg.text}
          time={msg.createdAt}
        />)
      })}
      <div ref={messagesEndRef} />
    </Section>
  );
}

export default Chat;
