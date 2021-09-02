import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#f48fb1",
    },
    secondary: {
      main: "#fff",
    },

    error: {
      main: red.A400,
    },
    background: {
      default: "#f6f6f4",
    },
  },
  typography: {
    fontFamily: [
      '"Noto Sans Japanese"',
      '"Avenir next"',
      "Helvetica",
      "Arial",
      '"Hiragino Sans"',
    ].join(","),
  },
});

export default theme;
