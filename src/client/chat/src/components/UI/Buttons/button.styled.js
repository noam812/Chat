import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  height: 2.5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  z-index: 0;
  background-color: #222831;
  color: whitesmoke;
  padding: 10px;
  margin: 1em;
  border-radius: 15px;
  border: 0px solid transparent;
  align-items: center;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    border: 3px solid transparent;
    background: linear-gradient(
        9deg,
        rgba(175, 189, 255, 1) 0%,
        rgba(194, 219, 226, 0.9587185215883228) 52%,
        rgba(118, 142, 255, 1) 100%
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0) border-box;
    -webkit-mask-composite: xor;
    -webkit-mask-composite: exclude;
    mask-composite: exclude;
  }
`;

const LoginButton = styled(StyledButton)`
  @media (max-width: 768px) {
    width: 60%;
    height: 4rem;
    font-size: 30px;
  }
`;
export { StyledButton, LoginButton };
