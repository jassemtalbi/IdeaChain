"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import LockIcon from "@mui/icons-material/Lock";
import BusinessIcon from "@mui/icons-material/Business";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PersonOffIcon from "@mui/icons-material/PersonOff";

const MotionBox = motion(Box);

const STATS = [
  {
    icon: <BusinessIcon sx={{ fontSize: 32, color: "#8b5cf6" }} />,
    value: "5 companies",
    label: "control 62% of all internet traffic",
    color: "#8b5cf6",
  },
  {
    icon: <LockIcon sx={{ fontSize: 32, color: "#06b6d4" }} />,
    value: "$300B",
    label: "data market — users are the product, not the owner",
    color: "#06b6d4",
  },
  {
    icon: <TrendingDownIcon sx={{ fontSize: 32, color: "#ec4899" }} />,
    value: "15–70%",
    label: "platforms take from every transaction",
    color: "#ec4899",
  },
  {
    icon: <PersonOffIcon sx={{ fontSize: 32, color: "#10b981" }} />,
    value: "0%",
    label: "equity for creators who build billion-dollar platforms",
    color: "#10b981",
  },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      sx={{
        py: 12,
        background: "linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.04) 50%, transparent 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="overline" sx={{ color: "#8b5cf6", fontWeight: 700, letterSpacing: 3 }}>
            THE PROBLEM
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
            Web2 was built for{" "}
            <Box component="span" sx={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              platforms, not people
            </Box>
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
            The centralized internet extracts value from users while leaving them with no ownership, no voice, and no equity.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {STATS.map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                sx={{
                  p: 3,
                  height: "100%",
                  background: "rgba(13, 22, 40, 0.7)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${stat.color}30`,
                  borderRadius: 3,
                  boxShadow: `0 4px 32px ${stat.color}10`,
                  textAlign: "center",
                  transition: "all 0.3s",
                  "&:hover": {
                    border: `1px solid ${stat.color}60`,
                    boxShadow: `0 8px 40px ${stat.color}20`,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{ color: stat.color, mb: 1 }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  {stat.label}
                </Typography>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
