import React from "react";
import styled from "styled-components";

type Props = {
  tags: string[];
};
function Tags({ tags }: Props) {
  return (
    <Wrapper>
      {tags.map((tag, index) => {
        return (
          <div key={`${tag}_${index}`} className="tag">
            {tag}
          </div>
        );
      })}
    </Wrapper>
  );
}

export default Tags;

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  width: 100;
  .tag {
    border: 1px solid #dfdfdf;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 500;
    color: #262626;
    padding: 3px 8px;
    margin-left: 3px;
  }
`;
