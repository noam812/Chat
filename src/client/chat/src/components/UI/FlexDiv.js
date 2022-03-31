import React from "react";

import styled from "styled-components";

const StyledFlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  width: ${(props) => props.width};
  justify-content: space-between;
`;
function FlexDiv({ children, flexDirection, width }) {
  return (
    <StyledFlexDiv width={width} flexDirection={flexDirection}>
      {children}
    </StyledFlexDiv>
  );
}

export default FlexDiv;
