import styled from "styled-components";

const StyledSection = styled.div`
  height: 100%;
  width: 100%;
  grid-column: ${(props) => props.gridColumn};
  grid-row: ${(props) => props.gridRow};
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "column"};
  background-color: ${(props) => props.bgColor || "black"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  border: solid 3px transparent;
  background-image: linear-gradient(#2d4059, #2d4059),
    linear-gradient(
      9deg,
      rgba(175, 189, 255, 1) 0%,
      rgba(194, 219, 226, 0.9587185215883228) 52%,
      rgba(118, 142, 255, 1) 100%
    );
  background-clip: padding-box, border-box;
  border-radius: 15px;
  overflow-y: ${(props) => props.scrollable || "none"};

  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-image: linear-gradient(
      9deg,
      rgba(175, 189, 255, 1) 0%,
      rgba(194, 219, 226, 0.9587185215883228) 52%,
      rgba(118, 142, 255, 1) 100%
    );
    background-clip: padding-box, border-box;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  }
`;

export default StyledSection;
