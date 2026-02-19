"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GroupsIcon from "@mui/icons-material/Groups";
import LinkIcon from "@mui/icons-material/Link";

const MotionBox = motion(Box);

const STEPS = [
  {
    icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
    step: "01",
    title: "Describe Your Idea",
    description: "Type any Web2 startup idea in plain English. No technical knowledge required.",
    color: "#8b5cf6",
    example: '"Airbnb for coworking spaces"',
  },
  {
    icon: <LinkIcon sx={{ fontSize: 40 }} />,
    step: "02",
    title: "AI Transforms in 30 Seconds",
    description: "Our AI analyzes market fit, designs token economics, structures governance, and drafts a full whitepaper.",
    color: "#06b6d4",
    example: "8 complete blueprint sections",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    step: "03",
    title: "Community Validates & Funds",
    description: "Share your blueprint. The community votes, contributes features, and backs ideas with micro-funding pools.",
    color: "#ec4899",
    example: "Min $1 · No rug pulls",
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box ref={ref} sx={{ py: 12 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="overline" sx={{ color: "#06b6d4", fontWeight: 700, letterSpacing: 3 }}>
            HOW IT WORKS
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
            From idea to blueprint in{" "}
            <Box component="span" sx={{ background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              3 steps
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          {STEPS.map((step, i) => (
            <Grid item xs={12} md={4} key={step.step}>
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                sx={{
                  p: 4,
                  height: "100%",
                  background: "rgba(13, 22, 40, 0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s",
                  "&:hover": {
                    border: `1px solid ${step.color}50`,
                    transform: "translateY(-4px)",
                    boxShadow: `0 8px 40px ${step.color}15`,
                  },
                }}
              >
                {/* Step number watermark */}
                <Typography
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 20,
                    fontSize: "5rem",
                    fontWeight: 900,
                    color: `${step.color}10`,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {step.step}
                </Typography>

                <Box sx={{ color: step.color, mb: 3 }}>{step.icon}</Box>

                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  {step.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                  {step.description}
                </Typography>

                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: `${step.color}12`,
                    border: `1px solid ${step.color}25`,
                    fontFamily: "monospace",
                    fontSize: "0.8rem",
                    color: step.color,
                  }}
                >
                  {step.example}
                </Box>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
