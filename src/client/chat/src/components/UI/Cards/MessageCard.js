import React from "react";
import { StyledMsgCard } from "./messageCard.styled";
import FlexDiv from "../FlexDiv";
import moment from "moment";

function MessageCard(props) {
  const time = moment(props.time).format("h:mm a");

  return (
    <StyledMsgCard alignSelf={props.alignSelf} flexDirection={"column"} lBorderTop={props.lBorderTop}>
      {props.text.match(/^https?\:\/\/(www\.)?google\.[a-z]+\/maps\b/) ? (
        <>
          <FlexDiv flexDirection={"row"} width={"60%"}>
            <p>{props.username}</p>
            <p>{time}</p>
          </FlexDiv>
          <a href={props.text}>My location</a>
        </>
      ) : (
        <>
          <FlexDiv flexDirection={"row"} width={"60%"}>
            <p>{props.username}</p>
            <p>{time}</p>
          </FlexDiv>
          <p>{props.text}</p>
        </>
      )}
    </StyledMsgCard>
  );
}

export default MessageCard;
