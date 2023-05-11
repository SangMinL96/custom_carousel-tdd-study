import { useEffect } from "react";

export const useRootOverflowyHidden = () => {
  useEffect(() => {
    const root = document.getElementById("root") as HTMLDivElement;
    const currentScrollValue = window.pageYOffset;
    root?.style.setProperty("width", "100%");
    root?.style.setProperty("min-height", "100vh");
    root?.style.setProperty("overflow-y", "hidden");
    root?.style.setProperty("position", "fixed");
    root?.style.setProperty("top", `-${currentScrollValue}px`);
    root?.style.setProperty("left", "0");
    return () => {
      root?.style.removeProperty("overflow-y");
      root?.style.removeProperty("position");
      root?.style.removeProperty("top");
      root?.style.removeProperty("left");
      window.scrollTo(0, currentScrollValue);
    };
  }, []);
};
