import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  padding?: string;
  width?: string;
  ariaLabel?: string;
};
function Content({
  children,
  padding = "10px",
  width = "100%",
  ariaLabel,
}: Props) {
  return (
    <Wrapper padding={padding} width={width} aria-label={ariaLabel}>
      {children}
    </Wrapper>
  );
}

export default Content;

type StyledType = Omit<Props, "children">;
const Wrapper = styled.div<StyledType>`
  position: relative;
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
`;
