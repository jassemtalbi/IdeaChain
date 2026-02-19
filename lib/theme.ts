"use client";

import { createTheme } from "@mui/material/styles";

export const ideaChainTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8b5cf6",
      light: "#a78bfa",
      dark: "#6d28d9",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#06b6d4",
      light: "#22d3ee",
      dark: "#0891b2",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ec4899",
    },
    success: {
      main: "#10b981",
    },
    warning: {
      main: "#f59e0b",
    },
    background: {
      default: "#050a14",
      paper: "#0d1628",
    },
    text: {
      primary: "#f0f4ff",
      secondary: "#94a3b8",
    },
    divider: "rgba(139, 92, 246, 0.15)",
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#050a14",
          color: "#f0f4ff",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(139,92,246,0.3) #050a14",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(13, 22, 40, 0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          boxShadow: "0 4px 32px rgba(139, 92, 246, 0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 10,
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(139, 92, 246, 0.3)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(139, 92, 246, 0.6)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#8b5cf6",
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(139, 92, 246, 0.15)",
          borderRadius: 4,
        },
        bar: {
          background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
          borderRadius: 4,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(139, 92, 246, 0.15)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          background: "#0d1628",
          border: "1px solid rgba(139, 92, 246, 0.15)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#111d35",
          border: "1px solid rgba(139, 92, 246, 0.3)",
        },
      },
    },
  },
});
