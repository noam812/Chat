import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => props.flexDirection || "inherit"};
  width: ${(props) => props.width || "100%"};
`;

export default StyledForm;
