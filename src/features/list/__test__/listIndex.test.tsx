import { render, screen } from "@testing-library/react";
import ListIndex from "../ListIndex";

describe("차량리스트 인덱스", () => {
  test("차량리스트 인덱스 컴포넌트 테스트", async () => {
    jest.mock("src/api/list", () => {
      return {
        useCarListData: () => {
          return {
            data: [],
            loading: false,
          };
        },
      };
    });
    render(<ListIndex />);
    const el = await screen.findByText("차량 리스트");
    expect(el).toBeInTheDocument();
  });

  test("스켈레톤 로딩 켐포넌트", async () => {
    jest.mock("src/api/list", () => {
      return {
        useCarListData: () => {
          return {
            data: [],
            loading: true,
          };
        },
      };
    });
    render(<ListIndex />);
    const el = await screen.findByTestId("list_loading_testid");
    expect(el).toBeInTheDocument();
  });
});
