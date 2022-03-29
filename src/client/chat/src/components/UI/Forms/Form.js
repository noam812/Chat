import React from "react";
import StyledForm from "./form.styled";
function Form(props) {
  return (
    <StyledForm onSubmit={props.onSubmit} flexdirection={props.flexDirection} width={props.width}>
      {props.children}
    </StyledForm>
  );
}

export default Form;
