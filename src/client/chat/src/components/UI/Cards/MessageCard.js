import React from "react";
import StyledMsgCard from "./messageCard.styled";
import moment from "moment";

function MessageCard(props) {
  const time = moment(props.time).format("h:mm a");
  return (
    <StyledMsgCard flexDirection={"column"}>
      {props.text.match(/^https?\:\/\/(www\.)?google\.[a-z]+\/maps\b/) ? (
        <>
          <>
            <p>{props.username}</p>
            <p>{time}</p>
          </>
          <a href={props.text}>My location</a>
        </>
      ) : (
        <>
          <>
            <p>{props.username}</p>
            <p>{time}</p>
          </>
          <p>{props.text}</p>
        </>
      )}
    </StyledMsgCard>
  );
}

export default MessageCard;
