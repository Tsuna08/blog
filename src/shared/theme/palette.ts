import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export const lightPalette = {
  primary: {
    main: "#5D71DD",
  },
  // secondary: {
  //   main: "#82c91e",
  // },
  // error: {
  //   main: "#ff4d4f",
  // },
};

export const breakpoints = {
  values: {
    mobile: 320,
    tablet: 640,
    laptop: 1024,
    desktop: 1920,
  },
};

export const theme = createTheme({
  palette: lightPalette,
  breakpoints: { ...breakpoints },
});
