"use client";

import { createTheme } from "@mui/material/styles";

export const ideonTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8b5cf6", light: "#a78bfa", dark: "#6d28d9", contrastText: "#ffffff" },
    secondary: { main: "#06b6d4", light: "#22d3ee", dark: "#0891b2", contrastText: "#ffffff" },
    error: { main: "#ec4899" },
    success: { main: "#10b981" },
    warning: { main: "#f59e0b" },
    background: { default: "#050a14", paper: "#0d1628" },
    text: { primary: "#f0f4ff", secondary: "#94a3b8" },
    divider: "rgba(139, 92, 246, 0.12)",
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontWeight: 800, letterSpacing: "-0.03em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, letterSpacing: "0.01em" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#050a14",
          color: "#f0f4ff",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(139,92,246,0.3) #050a14",
        },
        "::selection": {
          background: "rgba(139,92,246,0.35)",
          color: "#fff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(13,22,40,0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(139,92,246,0.18)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, borderRadius: 10, letterSpacing: "0.01em" },
        containedPrimary: {
          background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
          boxShadow: "0 0 20px rgba(139,92,246,0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
            boxShadow: "0 0 32px rgba(139,92,246,0.55)",
            transform: "translateY(-1px)",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(139,92,246,0.45)",
          "&:hover": { borderColor: "#8b5cf6", background: "rgba(139,92,246,0.08)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 8, fontWeight: 500 } },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            background: "rgba(13,22,40,0.6)",
            "& fieldset": { borderColor: "rgba(139,92,246,0.25)" },
            "&:hover fieldset": { borderColor: "rgba(139,92,246,0.55)" },
            "&.Mui-focused fieldset": { borderColor: "#8b5cf6", borderWidth: "1.5px" },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { backgroundColor: "rgba(139,92,246,0.12)", borderRadius: 4 },
        bar: { background: "linear-gradient(90deg, #8b5cf6, #06b6d4)", borderRadius: 4 },
      },
    },
    MuiTab: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" } },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: "rgba(139,92,246,0.12)" } },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", background: "#0d1628", border: "1px solid rgba(139,92,246,0.15)" },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: "#111d35", border: "1px solid rgba(139,92,246,0.3)", fontSize: "0.75rem" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { background: "#0d1628", border: "1px solid rgba(139,92,246,0.25)", boxShadow: "0 24px 80px rgba(0,0,0,0.7)" },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", fontWeight: 700 },
      },
    },
  },
});
