import { useCallback, useEffect, useRef, useState } from "react";
import { isDesktop } from "react-device-detect";
import getWindowDimensions from "src/hooks/useWindowDimensions";

type Props = {
  slideGap: number;
  totalLength: number;
};

type DraggableEventTypes = {
  onTouchStart: (ev: any) => void;
  onMouseDown: (ev: any) => void;
  onTouchMove: (ev: any) => void;
  onTouchEnd: () => void;
};

type ReturnTypes = {
  draggable: DraggableEventTypes;
  containerRef: React.RefObject<HTMLDivElement> | null;
  wrapperRef: React.RefObject<HTMLDivElement> | null;
};

export const useDraggableEvent = ({
  slideGap,
  totalLength,
}: Props): ReturnTypes => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slideEl = document.querySelector(".carousel_slide") as HTMLDivElement;
  const { width } = getWindowDimensions();

  const xMoveValue = useRef(0); // 현재 x 위치
  const xFirstTouchValue = useRef(0); // 처음 터치 이벤트 시작 위치

  const [isDragging, setIsDragging] = useState(false); // 터치후 드래그 진행 여부
  const [sideMargin, setSideMargin] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * @const xValue 마우스 커서 x위치
   */
  const handleTouchStart = useCallback((ev: any) => {
    const xValue = (ev as TouchEvent).touches
      ? (ev as TouchEvent).touches?.[0]?.clientX
      : (ev as MouseEvent)?.screenX;
    xMoveValue.current = xValue;
    xFirstTouchValue.current = xValue;
    setIsDragging(true);
  }, []);

  /**
   * @const xValue 마우스 커서 x위치
   * @const currentLeft 현재 위치해 있는 wrapper Left 값
   * @const deltaX 실시간 X위치 값 차이
   */
  const handleTouchMove = useCallback(
    (ev: any) => {
      if (isDragging && wrapperRef.current) {
        const xValue = (ev as TouchEvent).touches
          ? (ev as TouchEvent).touches?.[0]?.clientX
          : (ev as MouseEvent)?.screenX;

        const currentLeft = wrapperRef.current.offsetLeft;
        const deltaX = xValue - xMoveValue.current;
        wrapperRef.current.style.setProperty(
          "left",
          `${currentLeft + deltaX}px`
        );
        xMoveValue.current = xValue;
      }
    },
    [isDragging]
  );
  /**
   * @const firstTouchDiffValue X값이 얼마나 움직였는지 확인
   * @const leftMoveValue 슬라이드넓이 + 슬라이드Index 곱한후 (sideMargin)가운데 정렬을 위해 여백값 추가
   */
  const handleTouchEnd = useCallback(() => {
    // 첫클릭 -> 움직인 값 차이
    const firstTouchDiffValue = xMoveValue.current - xFirstTouchValue.current;
    // slide넓이
    const slideWidth = slideEl.offsetWidth + slideGap;
    const leftMoveValue = (index: number) => {
      setCurrentIndex(index);
      return slideWidth * index - sideMargin;
    };

    // 드래그 값이 작을때
    if (Math.abs(firstTouchDiffValue) < 60) {
      wrapperRef.current?.style.setProperty(
        "left",
        `${leftMoveValue(currentIndex) * -1}px`
      );
      // next드래그 일때
    } else if (firstTouchDiffValue < 0) {
      if (currentIndex === totalLength - 1) {
        wrapperRef.current?.style.setProperty(
          "left",
          `${leftMoveValue(currentIndex) * -1}px`
        );
      } else {
        wrapperRef.current?.style.setProperty(
          "left",
          `${leftMoveValue(currentIndex + 1) * -1}px`
        );
      }
      // prev드래그 일때
    } else {
      if (currentIndex === 0) {
        wrapperRef.current?.style.setProperty(
          "left",
          `${leftMoveValue(currentIndex) * -1}px`
        );
      } else {
        wrapperRef.current?.style.setProperty(
          "left",
          `${leftMoveValue(currentIndex - 1) * -1}px`
        );
      }
    }

    // 애니메이션 재생 0.2초
    wrapperRef.current?.style.setProperty("transition", "left 0.1s linear");
    // 애니메이션 0.2초 지난후 remove
    setTimeout(() => {
      wrapperRef.current?.style.removeProperty("transition");
    }, 200);

    // 데스크탑일때 캐러셀 마우스 클릭 이벤트 캡처링 제거
    if (isDesktop) {
      function captureClick(e: any) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (Math.abs(firstTouchDiffValue) > 2) {
        containerRef.current?.addEventListener("click", captureClick);
        setTimeout(
          () =>
            containerRef.current?.removeEventListener("click", captureClick),
          100
        );
      }
    }

    xFirstTouchValue.current = 0;
    setIsDragging(false);
  }, [currentIndex, sideMargin, slideGap, slideEl, totalLength]);

  // 카드 가변 넓이에 따른 초기 셋팅
  useEffect(() => {
    const margin = isDesktop
      ? (420 - Number(slideEl?.offsetWidth)) / 2
      : (Number(containerRef?.current?.offsetWidth) -
          Number(slideEl?.offsetWidth)) /
        2;
    setSideMargin(margin);
    setCurrentIndex(0);
    wrapperRef.current?.style.setProperty("left", `${margin}px`);
  }, [slideEl, width]);
  // isDesktop 전용 마우스 이벤트
  useEffect(() => {
    if (isDesktop && isDragging) {
      window.addEventListener("mousemove", handleTouchMove);
      window.addEventListener("mouseup", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleTouchMove);
      window.removeEventListener("mouseup", handleTouchEnd);
    };
  }, [handleTouchMove, isDragging, handleTouchEnd]);

  return {
    draggable: {
      onTouchStart: handleTouchStart,
      onMouseDown: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    containerRef,
    wrapperRef,
  };
};
