import React from "react";
import StyledInput from "./formInput.styled";

function FormInput(props) {
  return (
    <StyledInput
      value={props.value}
      onChange={props.onChange}
      type={props.type}
      required={props.required}
    />
  );
}

export default FormInput;
