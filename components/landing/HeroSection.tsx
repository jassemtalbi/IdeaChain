"use client";

import { useRouter } from "next/navigation";
import { Box, Container, Typography, Button, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExploreIcon from "@mui/icons-material/Explore";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function HeroSection() {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 60%)",
      }}
    >
      {/* Animated background orbs */}
      {[
        { top: "15%", left: "10%", color: "#8b5cf6", size: 300, delay: 0 },
        { top: "60%", right: "8%", color: "#06b6d4", size: 250, delay: 2 },
        { bottom: "10%", left: "35%", color: "#ec4899", size: 200, delay: 4 },
      ].map((orb, i) => (
        <MotionBox
          key={i}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          sx={{
            position: "absolute",
            top: orb.top,
            left: (orb as any).left,
            right: (orb as any).right,
            bottom: (orb as any).bottom,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Grid pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 12 }}>
        <Box sx={{ textAlign: "center" }}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
              label="AI-Powered Web3 Transformation"
              sx={{
                mb: 4,
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.4)",
                color: "#a78bfa",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
          </MotionBox>

          <MotionTypography
            variant="h1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
              fontWeight: 900,
              lineHeight: 1.1,
              mb: 2,
              letterSpacing: "-0.03em",
            }}
          >
            Web2 ideas deserve
            <Box
              component="span"
              sx={{
                display: "block",
                background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              a Web3 future.
            </Box>
          </MotionTypography>

          <MotionTypography
            variant="h5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            sx={{
              color: "text.secondary",
              fontWeight: 400,
              maxWidth: 580,
              mx: "auto",
              mb: 6,
              lineHeight: 1.6,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Describe any startup idea. Get a complete Web3 blueprint — token model, DAO structure, smart contracts, market analysis — in{" "}
            <Box component="span" sx={{ color: "#8b5cf6", fontWeight: 600 }}>30 seconds</Box>.
          </MotionTypography>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => router.push("/transform")}
                sx={{
                  px: 5,
                  py: 1.75,
                  fontSize: "1.05rem",
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  boxShadow: "0 0 30px rgba(139,92,246,0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                    boxShadow: "0 0 40px rgba(139,92,246,0.6)",
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
                  px: 4,
                  py: 1.75,
                  fontSize: "1.05rem",
                  borderColor: "rgba(139,92,246,0.4)",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "#8b5cf6",
                    background: "rgba(139,92,246,0.08)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s",
                }}
              >
                Explore Ideas
              </Button>
            </Stack>
          </MotionBox>

          {/* Social proof numbers */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            sx={{ mt: 8, display: "flex", justifyContent: "center", gap: { xs: 3, md: 6 }, flexWrap: "wrap" }}
          >
            {[
              { value: "500+", label: "Ideas Transformed" },
              { value: "30s", label: "Blueprint Time" },
              { value: "8", label: "Blueprint Sections" },
            ].map((stat) => (
              <Box key={stat.label} sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight={800} sx={{ background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
