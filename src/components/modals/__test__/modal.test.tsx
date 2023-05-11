import { render, screen } from "@testing-library/react";
import PortalModal from "../PortalModal";
import CarDetailModal from "../carDetailModal";
const mockData = {
  additionalOption: ["에어컨", "AUX/USB", "블루투스"],
  capacity: 5,
  carClassId: 1,
  carClassName: "더뉴아반떼",
  carImage: "",
  carModel: "준중형",
  fuel: "휘발유",
  gearbox: "자동",
  maker: "현대자동차",
  safetyOption: ["에어백", "후방감지센서", "블랙박스"],
};
jest.mock("src/api/list", () => {
  return {
    useCarDetailData: () => {
      return {
        data: mockData,
        loading: false,
      };
    },
  };
});

describe("모달 테스트", () => {
  test("포탈 모달 테스트", () => {
    render(
      <div id="portal-modal">
        <PortalModal open={true} close={() => {}}>
          <div>모달 자식요소 렌더</div>
        </PortalModal>
      </div>
    );
    const modalEl = screen.getByTestId("create_portal_testid");
    const childrenEl = screen.getByText("모달 자식요소 렌더");
    expect(modalEl).toBeInTheDocument();
    expect(childrenEl).toBeInTheDocument();
  });
});
describe("카드 디테일 모달 테스트", () => {
  test("카드 디테일 모달 Children 컴포넌트 테스트", async () => {
    window.scrollTo = jest.fn();
    render(<CarDetailModal />);

    const carClassName = await screen.findByText(mockData.carClassName);
    const carImage = await screen.findByTestId(mockData.carImage);
    const carModel = await screen.findByText(mockData.carModel);
    const fuel = await screen.findByText(mockData.fuel);
    const gearbox = await screen.findByText(mockData.gearbox);
    const maker = await screen.findByText(mockData.maker);
    expect(carClassName).toBeInTheDocument();
    expect(carImage).toBeInTheDocument();
    expect(carModel).toBeInTheDocument();
    expect(fuel).toBeInTheDocument();
    expect(gearbox).toBeInTheDocument();
    expect(maker).toBeInTheDocument();
  });
});
