import { useMemo } from "react";
import { isDesktop } from "react-device-detect";
import { CarListItf } from "src/api/list/interface";
import { useCardScrollInto } from "src/hooks/list/useCardScrollInto";
import { useListStore } from "src/store/list/useListStore";
import styled from "styled-components";
import { shallow } from "zustand/shallow";
import Carousel from "../UI/carousel/Carousel";
import SpecialPriceCarCard from "./SpecialPriceCarCard";
import ListEmptyBox from "../UI/box/ListEmptyBox";

type Props = {
  list: CarListItf[];
};

function SpecialPriceCarList({ list }: Props) {
  const [setListLimit] = useListStore((state) => [state.setListLimit], shallow);
  const { setScrollToCardId } = useCardScrollInto();

  const onCardClick = (id: number) => {
    const findIndex = list.findIndex((item) => item.carClassId === id);
    const limitNum = Math.ceil(findIndex / 5) * 5;
    setListLimit(limitNum);
    setScrollToCardId(id || null);
  };

  const specialListData = useMemo(
    () => list.filter((car) => car.carTypeTags.some((type) => type === "특가")),
    [list]
  );
  return (
    <SpecialPriceCarListContainer isDesktop={isDesktop}>
      <h3 className="section_title">특가 차량</h3>
      {specialListData?.length < 1 ? (
        <ListEmptyBox>특가 차량이 없습니다.</ListEmptyBox>
      ) : (
        <Carousel totalLength={specialListData?.length} slideGap={10}>
          {specialListData.map((car, index) => {
            return (
              <Carousel.Slide key={`${car.carClassId}_${index}`}>
                <CardButton
                  type="button"
                  onClick={() => onCardClick(car.carClassId)}
                >
                  <SpecialPriceCarCard data={car} />
                </CardButton>
              </Carousel.Slide>
            );
          })}
        </Carousel>
      )}
    </SpecialPriceCarListContainer>
  );
}

export default SpecialPriceCarList;

type StyledType = {
  isDesktop: boolean;
};

const SpecialPriceCarListContainer = styled.div<StyledType>`
  max-width: ${(props) => (props.isDesktop ? "420px" : "100%")};
  min-width: ${(props) => (props.isDesktop ? "420px" : "100%")};
  .section_title {
    padding: 20px;
    font-size: 1.8rem;
    font-weight: 700;
  }
`;

const CardButton = styled.button`
  width: 100%;
  height: 100%;
`;
