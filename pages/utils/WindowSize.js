import { useEffect, useCallback, useState } from "react";
export default function useWindowSize() {
  
  // const [windowSize, setWindowSize] = useState(false);

  // const updateTarget = useCallback((e) => {
  //   if (e.matches) {
  //     setWindowSize(true);
  //   } else {
  //     setWindowSize(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   const media = window.matchMedia(`(max-width: ${width}px)`);
  //   media.addEventListener("change", updateTarget);

  //   // Check on mount (callback is not called until a change occurs)
  //   if (media.matches) {
  //     setWindowSize(true);
  //   }

  //   return () => media.removeEventListener("change", updateTarget)
  // }, []);

  // return windowSize;

    const [windowSize, setWindowSize] = useState(0)
    useEffect(() => {
    
      function changeWindowSize() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }
      window.addEventListener("resize", changeWindowSize);
      changeWindowSize()
      return () => {
        window.removeEventListener("resize", changeWindowSize);
      };
    }, []);
    return windowSize;
  }