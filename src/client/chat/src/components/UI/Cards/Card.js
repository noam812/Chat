import React from "react";
import StyledCard from "./card.styled";
function Card(props) {
  return (
    <StyledCard flexDirection={props.flexDirection}>
      {props.children}
    </StyledCard>
  );
}

export default Card;
