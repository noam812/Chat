import React from "react";
import { AdminMsg } from "./messageCard.styled";
import FlexDiv from "../FlexDiv";
import moment from "moment";

function AdminMessageCard(props) {
  const time = moment(props.time).format("h:mm a");

  return (
    <AdminMsg flexDirection={"column"} alignSelf={"center"}>
      <>
        <FlexDiv flexDirection={"row"} width={"60%"}>
          <p>{props.username}</p>
          <p>{time}</p>
        </FlexDiv>

        <p>{props.text}</p>
      </>
    </AdminMsg>
  );
}

export default AdminMessageCard;
