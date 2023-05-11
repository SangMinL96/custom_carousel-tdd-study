import styled from "styled-components";

type Props = {
  title: string;
  text?: string;
};
function CarInfoRow({ title, text = "" }: Props) {
  return (
    <Wrapper>
      <h5>{title}:</h5>
      <p>{text}</p>
    </Wrapper>
  );
}

export default CarInfoRow;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > h5 {
    font-size: 1.4rem;
    font-weight: 500;
    color: #262626;
    margin-right: 5px;
  }
  > p {
    white-space: pre-wrap;
    line-height: 1.2;
    font-size: 1.4rem;
  }
`;
