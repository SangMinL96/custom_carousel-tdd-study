import React from "react";
import styled from "styled-components";
import Image from "./Image";
import Content from "./Content";
import Typography from "./Typography";
import Tags from "./Tags";
type Props = {
  children: React.ReactNode;
  width?: string;
  height?: string;
};

function Card({ children, width = "100%", height = "100%" }: Props) {
  return (
    <CardContainer width={width} height={height}>
      {children}
    </CardContainer>
  );
}

Card.Image = Image;
Card.Content = Content;
Card.Typography = Typography;
Card.Tags = Tags;
export default Card;
export { Card };

type StyledProps = {
  width?: string;
  height?: string;
};

const CardContainer = styled.div<StyledProps>`
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid #f8f8f8;
  border-radius: 8px;
  box-shadow: 0px 2px 12px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
