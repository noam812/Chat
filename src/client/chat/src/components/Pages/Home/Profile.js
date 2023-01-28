import React, { useState, useEffect } from "react";
import { StyledProfileSection } from "../../Layout/section.styled";
import Card from "../../UI/Cards/Card";

function Profile({ roomData, socket }) {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width :1024px)").matches) {
      setIsTablet(true);
    }
    if (!window.matchMedia("(max-width :1024px)").matches) {
      setIsTablet(false);
    }

    console.log(isTablet);
  }, []);

  const user = roomData.users?.find((user) => {
    return user.id === socket.id;
  });

  return (
    <StyledProfileSection>
      <h1> Welcome </h1>
      <h2>{user?.username}</h2>
      <h1>Room : {roomData.room}</h1>
      <h4>
        {roomData.users?.length}
        {roomData.users?.length > 1 ? "Members" : "Member"} in room
      </h4>
      {isTablet && (
        <>
          {roomData.users?.map((user, i) => {
            return <p>({user.username}) </p>;
          })}
        </>
      )}
      {!isTablet && (
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
      )}
    </StyledProfileSection>
  );
}

export default Profile;
