import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

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
      '"Helvetica Neue"',
      "Helvetica",
      "Arial",
      '"Hiragino Sans"',
      '"Meiryo"',
      "sans-serif",
    ].join(","),
  },
});

export default theme;
