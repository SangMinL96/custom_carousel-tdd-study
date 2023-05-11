import styled from "styled-components";

type Props = {
  title: string;
  options?: string[];
};

function OptionBox({ title, options }: Props) {
  return (
    <Wrapper>
      <h5>{title}</h5>
      <ul>
        {options?.map((option, index) => {
          return <li key={`${option}_${index}`}>- {option}</li>;
        })}
      </ul>
    </Wrapper>
  );
}

export default OptionBox;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  > h5 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #262626;
    margin-bottom: 20px;
  }
  ul > li {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    margin-bottom: 4px;
  }
`;
