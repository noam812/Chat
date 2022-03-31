import React from "react";
import Section from "../../Layout/Section";

function Profile({ roomData, socket }) {
  const user = roomData.users?.find((user) => {
    return user.id === socket.id;
  });
 


  return (
    <Section gridColumn={"7/8"} gridRow={"1/8"}  justifyContent={"flex-start"}>
      <h1> Welcome </h1>
      <h2>{user?.username}</h2>
    </Section>
  );
}

export default Profile;
