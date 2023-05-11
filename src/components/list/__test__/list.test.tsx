import { fireEvent, render, screen } from "@testing-library/react";
import AllCarCard from "../AllCarCard";
import AllCarList from "../AllCarList";
import SpecialPriceCarCard from "../SpecialPriceCarCard";
import SpecialPriceCarList from "../SpecialPriceCarList";

const mockData = [
  {
    carClassId: 1,
    carClassName: "더뉴아반떼",
    carModel: "준중형",
    image: "",
    drivingDistance: 5000,
    year: 2021,
    price: 225123,
    discountPercent: 25,
    regionGroups: ["서울/경기/인천", "광주"],
    carTypeTags: ["특가", "인기"],
  },
  {
    carClassId: 2,
    carClassName: "올뉴아반떼",
    carModel: "준중형",
    image: "",
    drivingDistance: 10000,
    year: 2021,
    price: 325448,
    discountPercent: 37,
    regionGroups: ["광주", "대전"],
    carTypeTags: ["빠른대여", "인기"],
  },
  {
    carClassId: 3,
    carClassName: "아반떼AD",
    carModel: "준중형",
    image: "",
    drivingDistance: 100000,
    year: 2017,
    price: 245852,
    discountPercent: 20,
    regionGroups: ["서울/경기/인천"],
    carTypeTags: ["인기"],
  },
  {
    carClassId: 4,
    carClassName: "스포티지",
    carModel: "SUV",
    image: "",
    drivingDistance: 100000,
    year: 2017,
    price: 343142,
    discountPercent: 15,
    regionGroups: ["서울/경기/인천"],
    carTypeTags: ["특가", "인기"],
  },
  {
    carClassId: 5,
    carClassName: "K5",
    carModel: "중형/대형",
    image: "",
    drivingDistance: 100000,
    year: 2017,
    price: 316000,
    discountPercent: 0,
    regionGroups: ["서울/경기/인천"],
    carTypeTags: ["인기"],
  },
  {
    carClassId: 6,
    carClassName: "K5 (LPG)",
    carModel: "중형/대형",
    image: "",
    drivingDistance: 100000,
    year: 2017,
    price: 342000,
    discountPercent: 10,
    regionGroups: ["서울/경기/인천"],
    carTypeTags: [],
  },
  {
    carClassId: 7,
    carClassName: "카니발 11인승",
    carModel: "SUV",
    image: "",
    drivingDistance: 50000,
    year: 2017,
    price: 324000,
    discountPercent: 14,
    regionGroups: ["서울/경기/인천"],
    carTypeTags: [],
  },
];

describe("리스트 컴포넌트", () => {
  describe("특가 차량 리스트", () => {
    test("특정 차량 있을 경우", () => {
      const list = mockData.filter((car) =>
        car.carTypeTags.some((type) => type === "특가")
      );
      render(<SpecialPriceCarList list={list} />);

      expect(screen.getByText("특가 차량")).toBeInTheDocument();
      list.forEach((car) => {
        expect(screen.getByText(car.carClassName)).toBeInTheDocument();
      });
    });
    test("특정 차량 없을 경우", () => {
      render(<SpecialPriceCarList list={[]} />);
      expect(screen.getByText("특가 차량이 없습니다.")).toBeInTheDocument();
    });
  });
  describe("특가 차량 카드", () => {
    test("카드 엘리먼트 존재하는지 체크", () => {
      const list = mockData.filter((car) =>
        car.carTypeTags.some((type) => type === "특가")
      );
      render(<SpecialPriceCarCard data={list[0]} />);
      expect(screen.getByText(list[0].carClassName)).toBeInTheDocument();
    });
  });

  describe("전체 차량 리스트", () => {
    test("전체 차량 있을 경우", () => {
      render(<AllCarList list={mockData} />);

      expect(screen.getByText("모든 차량")).toBeInTheDocument();
      mockData.slice(0, 5).forEach((car) => {
        expect(screen.getByText(car.carClassName)).toBeInTheDocument();
      });
    });
    test("전체 차량 없을 경우", () => {
      render(<AllCarList list={[]} />);
      expect(screen.getByText("차량 리스트가 없습니다.")).toBeInTheDocument();
    });
    test("전체 차량 더 보기 버튼 체크", async () => {
      render(<AllCarList list={mockData} />);

      expect(screen.getByText("더보기")).toBeInTheDocument();
      fireEvent.click(screen.getByText("더보기") as HTMLButtonElement);
      expect(screen.getByText("마지막 차량이에요")).toBeInTheDocument();
    });
    test("전체 차량 '마지막 차량이에요' 체크", () => {
      render(<AllCarList list={mockData.slice(0, 3)} />);
      expect(screen.getByText("마지막 차량이에요")).toBeInTheDocument();
    });

    test("전체 차량 카드 클릭 -> 모달 띄움", () => {
      window.scrollTo = jest.fn();
      render(
        <>
          <div id="portal-modal" />
          <AllCarList list={mockData} />
        </>
      );
      expect(
        screen.queryByTestId("create_portal_testid")
      ).not.toBeInTheDocument();
      const cardButtons = screen.getAllByTestId("card_button");
      const cardButton = cardButtons.find((button) =>
        button.id.includes(`car_card_${3}`)
      );
      fireEvent.click(cardButton as HTMLButtonElement);
      expect(screen.getByTestId("create_portal_testid")).toBeInTheDocument();
    });
  });
  describe("전체 차량 카드", () => {
    test("카드 엘리먼트 존재하는지 체크", () => {
      const list = mockData;
      render(<AllCarCard data={list[0]} />);
      expect(screen.getByText(list[0].carClassName)).toBeInTheDocument();
    });
  });
});
