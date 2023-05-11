export const truncateString = (str: string, slice: number) => {
  if (str.length > slice) {
    return str.slice(0, slice) + "...";
  } else {
    return str;
  }
};

export const formatNumber = (number: number, text: string = ""): string => {
  // 예)제일 처음 재귀 시작 키로수 156,000
  if (String(number).length > 4) {
    // 뒤에서 4자리를 잘라 만의자리 숫자 구함 = 15
    const 만의자리 = String(number).slice(0, -4);
    // 만의자리 15니까 앞에서 2자리 자른 숫자값 6000으로 재귀 돌림
    const 재귀시작숫자 = String(number).slice(만의자리.length);
    return formatNumber(Number(재귀시작숫자), `${만의자리}만`);
  } else if (String(number).length > 3) {
    // 재귀 시작숫자 6000, 뒤에서 3자리를 잘라 천의자리 숫자 구함 = 6
    const 천의자리 = String(number).slice(0, -3);
    // 천의자리 6이니까 앞에서 1자리 자른 숫자값 000으로 재귀 돌림
    const 재귀시작숫자 = String(number).slice(천의자리.length);
    return formatNumber(Number(재귀시작숫자), `${text}${천의자리}천`);
  } else if (String(number).length > 2) {
    const 백의자리 = String(number).slice(0, -2);
    const 재귀시작숫자 = String(number).slice(백의자리.length);
    const 첫숫자가백의자리 = text === "" ? `${백의자리}00` : `${text}`;
    return formatNumber(Number(재귀시작숫자), 첫숫자가백의자리);
  }
  return text;
};

export const showPrice = (x: number | string | undefined) => {
  if (!x) return 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const roundPrice = (price: number) => {
  return Math.round(price / 10) * 10;
};
