import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    gray: {
      unfocused: string;
    };
  }
}

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  breakpoints: { values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 } },
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    common: {
      gray: {
        unfocused: "#9FC6F8",
      },
      white: "#FFF",
      black: "#000",
    },
  },
  typography: {
    fontFamily: ["mulin-regular", roboto.style.fontFamily, "Helvetica Neue", "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          button: {
            color: "#fff",
          },
        },
      },
    },
  },
});

export default theme;
