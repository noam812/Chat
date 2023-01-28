import React from "react";
import { StyledUserMsgCard } from "./messageCard.styled";
import FlexDiv from "../FlexDiv";
import moment from "moment";

function UserMessageCard(props) {
  const time = moment(props.time).format("h:mm a");
  console.log(props.text.split("\n"));
  return (
    <StyledUserMsgCard flexDirection={"column"}>
      {/* TODO - fix regex this is where message types will be handy*/}
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

          <text>
            {props.text.split("\n").map((split, i) => {
              return split;
            })}
            <br></br>
          </text>
        </>
      )}
    </StyledUserMsgCard>
  );
}

export default UserMessageCard;
