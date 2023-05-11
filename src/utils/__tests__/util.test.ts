import { formatNumber, roundPrice, showPrice, truncateString } from "../util";

describe("utils", () => {
  test("키로수 한글 포멧팅 함수", () => {
    const case1 = 42000;
    const case2 = 5000;
    const case3 = 4532000;
    const case4 = 400;
    const case5 = 5423;
    const case6 = 56214444;
    const case7 = 500004;
    expect(formatNumber(case1)).toBe("4만2천");
    expect(formatNumber(case2)).toBe("5천");
    expect(formatNumber(case3)).toBe("453만2천");
    expect(formatNumber(case4)).toBe("400");
    expect(formatNumber(case5)).toBe("5천");
    expect(formatNumber(case6)).toBe("5621만4천");
    expect(formatNumber(case7)).toBe("50만");
  });
  test("특정 숫자 초과시 ...처리 함수", () => {
    const case1 = "안녕하세요 저는 이상민 입니다.";
    const case2 = "저는 현재 28살진행중 입니다.";
    const case3 = "마지막으로 eeee.....213123klsakkal#sladsfds,mc";
    expect(truncateString(case1, 5)).toBe("안녕하세요...");
    expect(truncateString(case2, 10)).toBe("저는 현재 28살진...");
    expect(truncateString(case3, 20)).toBe("마지막으로 eeee.....21312...");
  });
  test("숫자 콤마 처리 함수", () => {
    const case1 = "523000";
    const case2 = "58600000";
    const case3 = "5321588888845622";
    expect(showPrice(case1)).toBe("523,000");
    expect(showPrice(case2)).toBe("58,600,000");
    expect(showPrice(case3)).toBe("5,321,588,888,845,622");
  });
  test("십의자리 반올림 함수", () => {
    const case1 = 52312312;
    const case2 = 586123576;
    const case3 = 53215888888456438;
    const case4 = 98513475;
    const case5 = 4588931;

    expect(roundPrice(case1)).toBe(52312310);
    expect(roundPrice(case2)).toBe(586123580);
    expect(roundPrice(case3)).toBe(53215888888456440);
    expect(roundPrice(case4)).toBe(98513480);
    expect(roundPrice(case5)).toBe(4588930);
  });
});
