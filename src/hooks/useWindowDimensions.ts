import { useState, useEffect, useMemo, useCallback } from "react";
import { debounce } from "throttle-debounce";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const handleResize = useCallback(
    () => setWindowDimensions(getWindowDimensions()),
    []
  );
  const debouncedResize = useMemo(() => {
    return debounce(500, () => {
      handleResize();
    });
  }, [handleResize]);
  useEffect(() => {
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, debouncedResize]);

  return windowDimensions;
}
