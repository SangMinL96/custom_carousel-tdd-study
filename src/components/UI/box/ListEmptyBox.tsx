import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

function ListEmptyBox({ children }: Props) {
  return (
    <Wrapper>
      <div className="text_box">{children}</div>
    </Wrapper>
  );
}

export default ListEmptyBox;

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  .text_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 150px;
    border: 1px solid #eeeeee;
    border-radius: 8px;
    font-size: 1.8rem;
    font-weight: 700;
    color: #848484;
  }
`;
