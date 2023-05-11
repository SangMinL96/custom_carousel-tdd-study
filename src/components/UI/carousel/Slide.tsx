import React from "react";
import { theme } from "src/style/theme";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

function Slide({ children }: Props) {
  return (
    <Wrapper className="carousel_slide" data-testid="slide">
      {children}
    </Wrapper>
  );
}

export default Slide;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  animation: fadeIn 0.2s linear;
  ${theme.fadeIn};
`;
