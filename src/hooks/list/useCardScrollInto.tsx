import { useCallback, useEffect, useRef, useState } from "react";

export const useCardScrollInto = () => {
  const [scrollToCardid, setScrollToCardId] = useState<number | null>(null);
  const stopAfter200Times = useRef<Number>(0); // 200번 순환하는동안(약3초) 찾지 못할 경우 scrollToCardidFindRecursiveFn 실행중단
  /**
   * 리스트가 많아질 경우 혹은 비동기호출이 있어 엘리먼트를 못찾을 경우가 있다고 판단하여
   * 타켓 scrollToCardid 엘리먼트가 렌더 될때까지 useEffect를 이용한 재귀적함수 호출
   */
  const scrollToCardidFindRecursiveFn = useCallback(
    (id: number) => {
      const findCardEl = document.getElementById(`car_card_${scrollToCardid}`);
      if (!findCardEl && Number(stopAfter200Times.current) < 200) {
        // scrollToCardid 엘리먼트를 찾지 못했기 때문에 useEffect실행
        setScrollToCardId(null);
        setTimeout(() => setScrollToCardId(id), 10);
        return (stopAfter200Times.current =
          Number(stopAfter200Times.current) + 1);
      }
      // scrollToCardid 엘리먼트 찾았기 때문에 scrollIntoView 실행
      findCardEl?.style.removeProperty("animation");
      stopAfter200Times.current = 0;
      setTimeout(() => {
        findCardEl?.style.setProperty("animation", "shake 1.5s");
        findCardEl?.scrollIntoView({ block: "center" });
      }, 50);
    },
    [scrollToCardid, stopAfter200Times]
  );
  /**
   * 클릭한 scrollToCardid 엘리먼트를 찾을때까지 재귀
   * 리스트에 자신이 원하는 엘리먼트가 발견될때까지 렌더링
   */
  useEffect(() => {
    if (scrollToCardid) {
      // 3초 동안 card엘리먼트 찾지 못할 시 중단
      scrollToCardidFindRecursiveFn(scrollToCardid);
    }
    return () => {
      setScrollToCardId(null);
    };
  }, [scrollToCardid, scrollToCardidFindRecursiveFn]);
  return { scrollToCardid, setScrollToCardId };
};
