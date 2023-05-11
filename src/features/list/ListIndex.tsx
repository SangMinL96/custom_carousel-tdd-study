import { lazy } from "react";
import { useCarListData } from "src/api/list";
import ListLoading from "src/components/UI/skeleton/ListLoading";
import styled from "styled-components";

const AllCarList = lazy(() => import("src/components/list/AllCarList"));
const SpecialPriceCarList = lazy(
  () => import("src/components/list/SpecialPriceCarList")
);

function ListIndex() {
  const { data, isLoading } = useCarListData();

  return (
    <ListContainer data-testid="listIndex_testId">
      <Header>차량 리스트</Header>
      {isLoading ? (
        <ListLoading />
      ) : (
        <>
          <SpecialPriceCarList list={data} />
          <AllCarList list={data} />
        </>
      )}
    </ListContainer>
  );
}

export default ListIndex;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.h3`
  padding: 20px;
  text-align: center;
  font-size: 2.4rem;
  font-weight: 700;
`;
