import styled from "styled-components";

function ListLoading() {
  return (
    <Wrraper data-testid="list_loading_testid">
      <TitleBox />
      <CarouselBox>
        <div className="carouse_rect" />
        <div className="carouse_rect center" />
        <div className="carouse_rect" />
      </CarouselBox>
      <TitleBox />
      <CardListBox>
        <div className="card_list_rect" />
        <div className="card_list_rect" />
        <div className="card_list_rect" />
      </CardListBox>
    </Wrraper>
  );
}

export default ListLoading;

const Wrraper = styled.div`
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
`;

const TitleBox = styled.div`
  width: 150px;
  height: 25px;
  border-radius: 7px;
  background-color: #eeeeee;
  margin: 20px;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    height: 100%;
    width: 150px;
    background-image: linear-gradient(
      to right,
      #eeeeee 0%,
      rgba(0, 0, 0, 0.07) 20%,
      #eeeeee 40%,
      #eeeeee 100%
    );
    background-repeat: no-repeat;
    background-size: 150px 25px;
    animation: shimmer 1.5s linear infinite;
    @keyframes shimmer {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 80px 0;
      }
    }
  }
`;
const CarouselBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .carouse_rect {
    position: relative;
    width: 15%;
    height: 200px;
    background-color: #eeeeee;
    &::before {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background-image: linear-gradient(
        to right,
        #eeeeee 0%,
        rgba(0, 0, 0, 0.07) 20%,
        #eeeeee 40%,
        #eeeeee 100%
      );
      background-repeat: no-repeat;
      background-size: 300px 200px;
      animation: shimmer 1.5s linear infinite;
      @keyframes shimmer {
        0% {
          background-position: -150px 0;
        }
        100% {
          background-position: 420px 0;
        }
      }
    }
  }
  .carouse_rect.center {
    width: 60%;
  }
`;

const CardListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  .card_list_rect {
    position: relative;
    background: #eeeeee;
    box-shadow: 0 1px 3px #eeeeee;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 15px;
    &::before {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background-image: linear-gradient(
        to right,
        #eeeeee 0%,
        rgba(0, 0, 0, 0.07) 20%,
        #eeeeee 40%,
        #eeeeee 100%
      );
      background-repeat: no-repeat;
      background-size: 300px 300px;
      animation: shimmer 1.5s linear infinite;
      @keyframes shimmer {
        0% {
          background-position: -150px 0;
        }
        100% {
          background-position: 420px 0;
        }
      }
    }
  }
`;
