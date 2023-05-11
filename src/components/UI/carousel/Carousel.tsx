import React from "react";
import { isDesktop } from "react-device-detect";
import styled from "styled-components";
import Slide from "./Slide";
import { useDraggableEvent } from "./core";

type Props = {
  children: React.ReactNode;
  slideGap?: number;
  totalLength: number;
};

function Carousel({ children, slideGap = 10, totalLength = 10 }: Props) {
  const { containerRef, wrapperRef, draggable } = useDraggableEvent({
    slideGap,
    totalLength,
  });
  return (
    <Container
      ref={containerRef}
      isDesktop={isDesktop}
      className="carousel_container"
      slideGap={slideGap}
      {...draggable}
    >
      <div ref={wrapperRef} className="carousel_wrapper">
        {children}
      </div>
    </Container>
  );
}

Carousel.Slide = Slide;
export default Carousel;

type StyledType = {
  isDesktop: boolean;
  slideGap?: number;
};

const Container = styled.div<StyledType>`
  position: relative;
  height: 200px;
  overflow: hidden;
  user-select: none;
  max-width: ${(props) => (props.isDesktop ? "420px" : "100%")};
  min-width: ${(props) => (props.isDesktop ? "420px" : "100%")};
  cursor: grab;
  .carousel_wrapper {
    display: flex;
    position: absolute;
    justify-content: center;
    height: 200px;
    left: 0;
    overflow: hidden;
  }
  .carousel_slide {
    margin-right: ${(props) => props.slideGap}px;
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
`;
