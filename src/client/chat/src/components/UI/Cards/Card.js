import React from "react";
import StyledCard from "./card.styled";
function Card(props) {
  return (
    <StyledCard
      height={props.height}
      width={props.width}
      flexDirection={props.flexDirection}
      c1={props.c1}
      c2={props.c2}
      justifyContent={props.justifyContent}
    >
      {props.children}
    </StyledCard>
  );
}

export default Card;
