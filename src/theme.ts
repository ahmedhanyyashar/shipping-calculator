import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    success: {
      main: "#4caf50",
    },
    info: {
      main: "#2196f3",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    // fontSize: 14,
    h1: {
      fontSize: "3.2rem", // Mobile
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (min-width:600px)": { fontSize: "4.8rem" }, // Tablet+
    },
    h5: {
      fontSize: "1.8rem",
      fontWeight: 600,
      "@media (min-width:600px)": { fontSize: "2rem" },
    },
    body1: {
      fontSize: "1.4rem",
      "@media (min-width:600px)": { fontSize: "1.6rem" },
    },
    button: {
      fontSize: "1.4rem",
      fontWeight: 500,
      textTransform: "none",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
