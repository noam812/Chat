import styled from "styled-components";

const StyledInput = styled.input`
  color: whitesmoke;
  background-color: #222831;
  height: 2rem;
  width: 30rem;
  border: solid 3px transparent;
  border-radius: 15px;
  background-image: linear-gradient(#222831, #222831),
    linear-gradient(
      9deg,
      rgba(175, 189, 255, 1) 0%,
      rgba(194, 219, 226, 0.9587185215883228) 52%,
      rgba(118, 142, 255, 1) 100%
    );
  background-clip: padding-box, border-box;
`;

const StyledTxtArea = styled.textarea`
  color: whitesmoke;
  background-color: #222831;
  height: 2rem;
  width: 30rem;
  border: solid 3px transparent;
  border-radius: 15px;
  background-image: linear-gradient(#222831, #222831),
    linear-gradient(
      9deg,
      rgba(175, 189, 255, 1) 0%,
      rgba(194, 219, 226, 0.9587185215883228) 52%,
      rgba(118, 142, 255, 1) 100%
    );
  background-clip: padding-box, border-box;
`;


const LoginInput = styled(StyledInput)`
  height: 2rem;
  width: 80%;
  margin: 2rem;
`;

export { StyledInput, LoginInput,StyledTxtArea };
