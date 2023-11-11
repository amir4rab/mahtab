import { useSignal } from "@preact/signals";
import { useCallback, useEffect, useRef } from "preact/hooks";

type Breakpoint =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | `(min-width: ${number}px)`
  | `(max-width: ${number}px)`;

/** Constructs a min-width breakpoint */
const _minWidthConstructor = (v: string) => `(min-width: ${v})`;

/** Generated the default breakpoint of tailwind css */
const getBreakpoint = (breakpoint: Breakpoint) => {
  let breakpointValue: string = breakpoint;

  switch (breakpoint) {
    case "sm": {
      breakpointValue = _minWidthConstructor("480px");
      break;
    }
    case "md": {
      breakpointValue = _minWidthConstructor("768px");
      break;
    }
    case "lg": {
      breakpointValue = _minWidthConstructor("976px");
      break;
    }
    case "xl": {
      breakpointValue = _minWidthConstructor("1440px");
      break;
    }
  }

  return breakpointValue;
};

/**
 * useMediaMatch uses `window.matchMedia(...)` and matches the screen width with the given breakpoint.
 * @param {Breakpoint} [breakpoint] - The desired breakpoint, either TailwindsCSS breakpoints ( ie: sm, md, lg, xl ) or '(min-width: 1000px)' for min width breakpoints or '(max-width: 1000px)' for max-width breakpoints.
 * @example
 * const isDesktop = useMediaMatch("md"); // Returns true when screen width is bigger than `768px`
 * @example
 * const isDesktop = useMediaMatch("(min-width: 768px)"); // Returns true when screen width is bigger than `768px`
 */
const useMediaMatch = (breakpoint: Breakpoint = "md") => {
  const isDesktop = useSignal(false);
  const resizeObserverRef = useRef<null | ResizeObserver>(null);

  const checkWindow = useCallback(
    () =>
      (isDesktop.value = window.matchMedia(getBreakpoint(breakpoint)).matches),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    resizeObserverRef.current = new ResizeObserver(checkWindow);
    resizeObserverRef.current.observe(window.document.body);

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
    };
  }, []);

  return isDesktop;
};

export default useMediaMatch;
