import styled from "styled-components";
import { StyledCard } from "./card.styled";

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
  border-radius: 40px;
  border-top-left-radius: ${(props) => props.lBorderTop || "0%"};
  align-self: ${(props) => props.alignSelf || "flex-start"};
`;

const StyledUserMsgCard = styled(StyledMsgCard)`
  align-self: flex-end;
  background-image: linear-gradient(#6079ed, rgb(118 142 255)),
    linear-gradient(
      9deg,
      rgb(142 142 170) 0%,
      rgb(221 222 204 / 96%) 52%,
      rgb(160 167 203) 100%
    );
  border-radius: 40px;
  border-top-right-radius: 0%;
`;

const AdminMsg = styled(StyledMsgCard)`
  border-radius: none;
  background-image: none;
  background-color: transparent;
`;
export { StyledMsgCard, StyledUserMsgCard, AdminMsg };
