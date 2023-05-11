import { useMemo, useState } from "react";
import { isDesktop } from "react-device-detect";
import { CarListItf } from "src/api/list/interface";
import { useListStore } from "src/store/list/useListStore";
import { formatNumber } from "src/utils/util";
import styled from "styled-components";
import { shallow } from "zustand/shallow";
import PortalModal from "../modals/PortalModal";
import CarDetailModal from "../modals/carDetailModal";
import AllCarCard from "./AllCarCard";
import { theme } from "src/style/theme";
import ListEmptyBox from "../UI/box/ListEmptyBox";

type Props = {
  list: CarListItf[];
};

function AllCarList({ list }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listLimit = 5, setListLimit, setDetailCarClassId] = useListStore(
    (state) => [state.listLimit, state.setListLimit, state.setDetailCarClassId],
    shallow
  );

  const listSliceData = useMemo(
    () => list?.slice(0, listLimit),
    [list, listLimit]
  );
  return (
    <>
      <AllCarListContainer isDesktop={isDesktop}>
        <h3 className="section_title">모든 차량</h3>
        {listSliceData?.length < 1 ? (
          <ListEmptyBox>차량 리스트가 없습니다.</ListEmptyBox>
        ) : (
          <>
            {listSliceData?.map((car, index) => {
              const ariaLabel = `연식 ${car.year}년 주행거리${formatNumber(
                car.drivingDistance
              )}키로미터 지역${car.regionGroups.join(",")}`;
              return (
                <CardButton
                  data-testid="card_button"
                  type="button"
                  aria-label={ariaLabel}
                  id={`car_card_${car.carClassId}`}
                  key={`${car.carClassId}_${index}_allcar`}
                  onClick={() => {
                    setDetailCarClassId(car.carClassId);
                    setIsModalOpen(true);
                  }}
                >
                  <AllCarCard data={car} />
                </CardButton>
              );
            })}
            <ListMoreButton
              data-testid="add_more_button"
              type="button"
              onClick={() => {
                if (listLimit >= list.length) return;
                setListLimit(listLimit + 5);
              }}
            >
              {listLimit >= list.length ? "마지막 차량이에요" : "더보기"}
            </ListMoreButton>
          </>
        )}
      </AllCarListContainer>
      <PortalModal close={() => setIsModalOpen(false)} open={isModalOpen}>
        <CarDetailModal />
      </PortalModal>
    </>
  );
}

export default AllCarList;

type StyledType = {
  isDesktop: boolean;
};

const AllCarListContainer = styled.div<StyledType>`
  margin-top: 30px;
  max-width: ${(props) => (props.isDesktop ? "420px" : "100%")};
  min-width: ${(props) => (props.isDesktop ? "420px" : "100%")};

  animation: fadeIn 0.2s linear;
  ${theme.fadeIn};
  .section_title {
    padding: 20px;
    font-size: 1.8rem;
    font-weight: 700;
  }
`;

const CardButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  transition: all 0.2s linear;
  &:hover {
    transform: translateY(-5px) scale(1.01);
  }
  @keyframes shake {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translate(-2px, 0) rotate(-2deg);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translate(2px, 0) rotate(2deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }
`;

const ListMoreButton = styled.button`
  margin: 20px 0;
  width: 100%;
  height: 50px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  background-color: #262626;
  font-size: 1.7rem;
  font-weight: 700;
  color: white;
`;
