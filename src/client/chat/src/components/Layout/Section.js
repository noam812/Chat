import React from "react";
import {StyledSection} from "./section.styled";

function Section(props) {
  return (
    <StyledSection
      flexDirection={props.flexDirection}
      gridColumn={props.gridColumn}
      gridRow={props.gridRow}
      bgColor={props.bgColor}
      justifyContent={props.justifyContent}
      alignItems={props.alignItems}
      scrollable={props.scrollable}
      className={props.className}
    >
      {props.children}
    </StyledSection>
  );
}

export default Section;
