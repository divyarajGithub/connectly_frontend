import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6C5CE7",
      light: "#A29BFE",
      dark: "#4B3FBF",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FF4D8D",
      light: "#FF8FB1",
      dark: "#D6336C",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F7F8FC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },
  },
});

export default theme;