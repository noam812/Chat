import React from "react";
import Section from "../../Layout/Section";
import Card from "../../UI/Cards/Card";

function Sidebar({ roomData }) {
  console.log(roomData);
  return (
    <Section gridColumn={"1/2"} gridRow={"1/8"}>
      <h1>Room : {roomData.room}</h1>
      <ul>
        {roomData.users?.map((user, i) => {
          return (<li key={i}>{user.username}</li>);
        })}
      </ul>
    </Section>
  );
}

export default Sidebar;
