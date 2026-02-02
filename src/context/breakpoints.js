// Centralized responsive breakpoints and helpers
import { useMediaQuery } from "react-responsive";

// Breakpoints in em for responsive typography scaling
// 1em = 16px (standard browser default)
export const BREAKPOINTS = {
  mobileMax: "36em", // < 576px
  tabletMin: "36.063em", // >= 577px
  tabletMax: "54em", // < 864px
  mediumMin: "54.063em", // >= 865px
  mediumMax: "68em", // < 1088px
  largeMin: "68.063em", // >= 1089px
  largeMax: "80em", // < 1280px
  extraLargeMin: "80.063em", // >= 1281px
  extraLargeMax: "93.75em", // < 1500px
  extraExtraLargeMin: "93.813em", // >= 1501px
};

export function useBreakpoints() {
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.mobileMax });
  const isTablet = useMediaQuery({
    minWidth: BREAKPOINTS.tabletMin,
    maxWidth: BREAKPOINTS.tabletMax,
  });
  const isMedium = useMediaQuery({
    minWidth: BREAKPOINTS.mediumMin,
    maxWidth: BREAKPOINTS.mediumMax,
  });
  const isLarge = useMediaQuery({
    minWidth: BREAKPOINTS.largeMin,
    maxWidth: BREAKPOINTS.largeMax,
  });
  const isExtraLarge = useMediaQuery({
    minWidth: BREAKPOINTS.extraLargeMin,
    maxWidth: BREAKPOINTS.extraLargeMax,
  });
  const isExtraExtraLarge = useMediaQuery({ minWidth: BREAKPOINTS.extraExtraLargeMin });

  const size = isMobile
    ? "mobile"
    : isTablet
    ? "tablet"
    : isMedium
    ? "medium"
    : isLarge
    ? "large"
    : isExtraLarge
    ? "extraLarge"
    : "extraExtraLarge";

  return { isMobile, isTablet, isMedium, isLarge, isExtraLarge, isExtraExtraLarge, size };
}

// // Optional helper to derive a value per breakpoint
// export function selectByBreakpoint(values) {
//   // values = { mobile, tablet, medium, large }
//   const { isMobile, isTablet, isMedium } = useBreakpoints();
//   if (isMobile) return values.mobile;
//   if (isTablet) return values.tablet;
//   if (isMedium) return values.medium;
//   return values.large;
// }
