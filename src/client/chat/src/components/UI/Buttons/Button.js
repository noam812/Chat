import React from "react";
import StyledButton from "./button.styled";

function Button(props) {
  return (
    <StyledButton onClick={props.onClick} type={props.type}>
   
      {props.children}
    </StyledButton>
  );
}

export default Button;
