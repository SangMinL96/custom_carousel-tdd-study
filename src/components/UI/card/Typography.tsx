import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  color?: string;
  align?: "center" | "end" | "justify" | "left" | "right" | "start";
};
function Typography({
  children,
  fontSize = "1.4rem",
  color = "#262626",
  fontWeight = 400,
  align = "start",
}: Props) {
  return (
    <P fontSize={fontSize} color={color} fontWeight={fontWeight} align={align}>
      {children}
    </P>
  );
}

export default Typography;

type StyledType = Omit<Props, "children">;
const P = styled.p<StyledType>`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  line-height: 1.5;
  text-align: ${(props) => props.align};
`;
