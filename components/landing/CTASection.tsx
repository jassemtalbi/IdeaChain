"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MotionBox = motion(Box);

export default function CTASection() {
  const router = useRouter();

  return (
    <Box
      sx={{
        py: 16,
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)",
      }}
    >
      <Container maxWidth="md">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center" }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 48, color: "#8b5cf6", mb: 3 }} />

          <Typography variant="h2" fontWeight={900} sx={{ mb: 3, letterSpacing: "-0.02em" }}>
            Every great Web3 startup{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              started here.
            </Box>
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400, lineHeight: 1.6 }}>
            IdeaChain becomes the mandatory first step for any founder who wants to build in Web3. The world's first AI-powered Web3 startup incubator — owned by its community.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => router.push("/transform")}
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                boxShadow: "0 0 40px rgba(139,92,246,0.5)",
                "&:hover": {
                  background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                  boxShadow: "0 0 60px rgba(139,92,246,0.7)",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.2s",
              }}
            >
              Transform Your Idea Now
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: "block" }}>
            Free · No credit card required · 30-second blueprint
          </Typography>
        </MotionBox>
      </Container>
    </Box>
  );
}
