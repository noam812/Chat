import styled from "styled-components";
import StyledCard from "./card.styled";

const StyledMsgCard = styled(StyledCard)`
  height: fit-content;
  width: 20rem;
  margin: 1rem;
  background-image: linear-gradient(#222831, #222831),
    linear-gradient(
      9deg,
      rgba(175, 189, 255, 1) 0%,
      rgba(194, 219, 226, 0.9587185215883228) 52%,
      rgba(118, 142, 255, 1) 100%
    );
  background-clip: padding-box, border-box;
  border-radius: 15px;
`;

export default StyledMsgCard;
