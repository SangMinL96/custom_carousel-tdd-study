import { lazy } from "react";
import { isDesktop } from "react-device-detect";
import styled from "styled-components";

const ListIndex = lazy(() => import("src/features/list/ListIndex"));

function ListPage() {
  return (
    <Container isDesktop={isDesktop}>
      <ListIndex />
    </Container>
  );
}

export default ListPage;

type StyledType = {
  isDesktop: boolean;
};

const Container = styled.div<StyledType>`
  width: ${(props) => (props.isDesktop ? "420px" : "100%")};
  max-width: ${(props) => (props.isDesktop ? "420px" : "100%")};
  min-height: 100vh;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
`;
