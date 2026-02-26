"use client";

import { useRouter } from "next/navigation";
import { Box, Container, Typography, Button, Stack, Chip } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExploreIcon from "@mui/icons-material/Explore";
import BoltIcon from "@mui/icons-material/Bolt";
import TokenIcon from "@mui/icons-material/Token";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const TICKER_ITEMS = [
  { icon: <BoltIcon sx={{ fontSize: 13 }} />, text: "Token Model Generated" },
  { icon: <AccountBalanceIcon sx={{ fontSize: 13 }} />, text: "DAO Structure Ready" },
  { icon: <TokenIcon sx={{ fontSize: 13 }} />, text: "Smart Contracts Spec'd" },
  { icon: <TrendingUpIcon sx={{ fontSize: 13 }} />, text: "Market Analysis Done" },
  { icon: <AutoAwesomeIcon sx={{ fontSize: 13 }} />, text: "Whitepaper Drafted" },
  { icon: <BoltIcon sx={{ fontSize: 13 }} />, text: "GTM Strategy Created" },
];

const TRUST_SIGNALS = [
  { value: "500+", label: "Ideas Transformed", color: "#8b5cf6" },
  { value: "30s", label: "Avg Blueprint Time", color: "#06b6d4" },
  { value: "8", label: "Blueprint Sections", color: "#10b981" },
  { value: "100%", label: "AI-Powered", color: "#ec4899" },
];

const DEMO_TAGS = ["Token Model", "DAO Structure", "Smart Contracts", "GTM Strategy", "Whitepaper", "Market Analysis"];

export default function HeroSection() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background: deep radial + grid */}
      <Box sx={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.18) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(139,92,246,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.035) 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
        pointerEvents: "none",
      }} />

      {/* Floating orbs */}
      {[
        { top: "18%", left: "8%", color: "#8b5cf6", size: 340, delay: 0, dur: 7 },
        { top: "55%", right: "6%", color: "#06b6d4", size: 280, delay: 2, dur: 9 },
        { bottom: "12%", left: "30%", color: "#ec4899", size: 220, delay: 4, dur: 11 },
      ].map((orb, i) => (
        <MotionBox
          key={i}
          animate={prefersReducedMotion ? {} : { y: [0, -24, 0] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          sx={{
            position: "absolute",
            top: (orb as any).top, left: (orb as any).left,
            right: (orb as any).right, bottom: (orb as any).bottom,
            width: orb.size, height: orb.size, borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color}20 0%, transparent 70%)`,
            filter: "blur(50px)", pointerEvents: "none",
          }}
        />
      ))}

      {/* Animated ticker bar */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, overflow: "hidden", height: 36, borderBottom: "1px solid rgba(139,92,246,0.1)", background: "rgba(5,10,20,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center" }}>
        <MotionBox
          animate={prefersReducedMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          sx={{ display: "flex", gap: 5, whiteSpace: "nowrap", px: 3 }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "rgba(167,139,250,0.7)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.04em" }}>
              <Box sx={{ color: "#8b5cf6" }}>{item.icon}</Box>
              {item.text}
              <Box sx={{ mx: 1, width: 3, height: 3, borderRadius: "50%", background: "rgba(139,92,246,0.4)" }} />
            </Box>
          ))}
        </MotionBox>
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pt: 10, pb: 8 }}>
        <Box sx={{ textAlign: "center" }}>

          {/* Badge */}
          <MotionBox initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 14, color: "#a78bfa !important" }} />}
              label="Powered by Llama 3.3 · Web3 Transformation"
              sx={{
                mb: 4, height: 32,
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.35)",
                color: "#a78bfa", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.02em",
              }}
            />
          </MotionBox>

          {/* Headline */}
          <MotionTypography
            variant="h1"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            sx={{
              fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4.2rem", lg: "5.2rem" },
              fontWeight: 900, lineHeight: 1.08, mb: 2.5, letterSpacing: "-0.03em",
            }}
          >
            Any Web2 idea.
            <Box component="span" sx={{
              display: "block",
              background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 55%, #10b981 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Full Web3 blueprint.
            </Box>
          </MotionTypography>

          {/* Subline */}
          <MotionTypography
            variant="h5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            sx={{
              color: "text.secondary", fontWeight: 400,
              maxWidth: 560, mx: "auto", mb: 5,
              lineHeight: 1.65, fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Describe your startup idea. Get a complete Web3 blueprint —{" "}
            <Box component="span" sx={{ color: "#a78bfa", fontWeight: 600 }}>token model</Box>,{" "}
            <Box component="span" sx={{ color: "#06b6d4", fontWeight: 600 }}>DAO structure</Box>,{" "}
            <Box component="span" sx={{ color: "#10b981", fontWeight: 600 }}>smart contracts</Box>{" "}
            and market analysis — in{" "}
            <Box component="span" sx={{ color: "#8b5cf6", fontWeight: 700 }}>30 seconds</Box>.
          </MotionTypography>

          {/* CTA buttons */}
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => router.push("/transform")}
                sx={{
                  px: 5, py: 1.75, fontSize: "1.05rem", fontWeight: 700,
                  background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                  boxShadow: "0 0 32px rgba(139,92,246,0.45)",
                  borderRadius: 2.5,
                  "&:hover": {
                    background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
                    boxShadow: "0 0 48px rgba(139,92,246,0.65)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s",
                }}
              >
                Transform Your Idea
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ExploreIcon />}
                onClick={() => router.push("/explore")}
                sx={{
                  px: 4, py: 1.75, fontSize: "1.05rem",
                  borderColor: "rgba(139,92,246,0.35)", color: "text.primary",
                  borderRadius: 2.5,
                  "&:hover": { borderColor: "#8b5cf6", background: "rgba(139,92,246,0.07)", transform: "translateY(-2px)" },
                  transition: "all 0.2s",
                }}
              >
                Explore Ideas
              </Button>
            </Stack>
          </MotionBox>

          {/* Demo blueprint tag strip */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            sx={{ mt: 5, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1 }}
          >
            {DEMO_TAGS.map((tag, i) => (
              <MotionBox
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.07 }}
              >
                <Chip
                  label={tag}
                  size="small"
                  sx={{
                    background: "rgba(13,22,40,0.8)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    color: "text.secondary",
                    fontSize: "0.72rem",
                    "&:hover": { borderColor: "rgba(139,92,246,0.5)", color: "#a78bfa" },
                    transition: "all 0.2s",
                  }}
                />
              </MotionBox>
            ))}
          </MotionBox>

          {/* Trust signals */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            sx={{
              mt: 8,
              display: "flex", justifyContent: "center",
              gap: { xs: 3, md: 6 }, flexWrap: "wrap",
            }}
          >
            {TRUST_SIGNALS.map((stat, i) => (
              <MotionBox
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                sx={{ textAlign: "center" }}
              >
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    fontSize: { xs: "1.75rem", md: "2.2rem" },
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: "0.03em" }}>
                  {stat.label}
                </Typography>
              </MotionBox>
            ))}
          </MotionBox>

          {/* Subtle gradient fade at bottom */}
          <Box sx={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
            background: "linear-gradient(to top, #050a14 0%, transparent 100%)",
            pointerEvents: "none",
          }} />
        </Box>
      </Container>
    </Box>
  );
}
