import React from "react";
import styled from "styled-components";

type Props = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: "contain" | "cover" | "fill" | "none";
};

function Image({
  src,
  alt,
  width = "100%",
  height = "100%",
  objectFit = "cover",
}: Props) {
  return (
    <Wrapper width={width} height={height} objectFit={objectFit}>
      <img src={src} alt={alt} />
    </Wrapper>
  );
}

export default Image;

type StyledProps = {
  width?: string;
  height?: string;
  objectFit?: "contain" | "cover" | "fill" | "none";
};
const Wrapper = styled.div<StyledProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  img {
    width: 100%;
    height: 100%;
    object-fit: ${(props) => props.objectFit};
    pointer-events: none;
  }
`;
