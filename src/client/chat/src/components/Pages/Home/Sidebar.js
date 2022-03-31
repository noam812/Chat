import React from "react";
import Section from "../../Layout/Section";
import Card from "../../UI/Cards/Card";

function Sidebar({ roomData }) {
  console.log(roomData);
  return (
    <Section gridColumn={"1/2"} gridRow={"1/8"} justifyContent={"flex-start"}>
      <h1>Room : {roomData.room}</h1>
      <h4>
        {roomData.users?.length}{" "}
        {roomData.users?.length > 1 ? "Members" : "Member"} in room
      </h4>
      <Card
        height={"fit-content"}
        width={"10rem"}
        justifyContent={"flex-start"}
        c1={"#222831"}
        c2={"#222831"}
      >
        <ul>
          {roomData.users?.map((user, i) => {
            return <li key={i}>{user.username}</li>;
          })}
        </ul>
      </Card>
    </Section>
  );
}

export default Sidebar;
