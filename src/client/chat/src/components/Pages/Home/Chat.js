import React, { useRef, useEffect } from "react";
import { StyledChatSection } from "./../../Layout/section.styled";
import MessageCard from "../../UI/Cards/MessageCard";
import UserMessageCard from "../../UI/Cards/UserMessageCard";
import AdminMessageCard from "./../../UI/Cards/AdminMsgCard";

function Chat({ messages, socket, roomData }) {
  const messagesEndRef = useRef(null);

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
    <StyledChatSection gridColumn={"1/7"} gridRow={"1/7"} scrollable={"auto"}>
      {messages.map((msg, i) => {
        console.log(msg);
        if (msg.username === "Admin" || !msg.username) {
          return (
            <AdminMessageCard
              key={i}
              username={msg.username}
              text={msg.text}
              time={msg.createdAt}
            />
          );
        }
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

        return (
          <UserMessageCard
            key={i}
            username={msg.username}
            text={msg.text}
            time={msg.createdAt}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </StyledChatSection>
  );
}

export default Chat;
