import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  height: ${(props) => props.height || "40rem"};
  width: ${(props) => props.width || "35rem"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  border: solid 3px transparent;
  background-image: linear-gradient(
      ${(props) => props.c1 || "#2d4059"},
      ${(props) => props.c2 || "#2d4059"}
    ),
    linear-gradient(
      9deg,
      rgba(175, 189, 255, 1) 0%,
      rgba(194, 219, 226, 0.9587185215883228) 52%,
      rgba(118, 142, 255, 1) 100%
    );
  background-clip: padding-box, border-box;
  border-radius: 15px;
`;

export default StyledCard;
