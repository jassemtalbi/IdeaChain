"use client";

import { useEffect, useState } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import LinkIcon from "@mui/icons-material/Link";

const MotionBox = motion(Box);

const STATUS_MESSAGES = [
  { text: "Parsing idea structure...", icon: "🧠" },
  { text: "Analyzing market landscape...", icon: "📊" },
  { text: "Designing token economics...", icon: "🪙" },
  { text: "Structuring DAO governance...", icon: "🏛" },
  { text: "Selecting optimal blockchain...", icon: "⛓" },
  { text: "Drafting smart contract specs...", icon: "📜" },
  { text: "Building go-to-market strategy...", icon: "🚀" },
  { text: "Identifying competitors...", icon: "🔍" },
  { text: "Writing whitepaper sections...", icon: "📋" },
  { text: "Finalizing blueprint...", icon: "✨" },
];

const DURATION_MS = 30000;

export default function LoadingAnimation() {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION_MS) * 100, 97);
      setProgress(pct);

      const msgIdx = Math.min(
        Math.floor((elapsed / DURATION_MS) * STATUS_MESSAGES.length),
        STATUS_MESSAGES.length - 1
      );
      setMsgIndex(msgIdx);

      if (elapsed >= DURATION_MS) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const current = STATUS_MESSAGES[msgIndex];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 8,
        px: 4,
        textAlign: "center",
      }}
    >
      {/* Spinning chain icon */}
      <MotionBox
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        sx={{ mb: 4, color: "#8b5cf6" }}
      >
        <LinkIcon sx={{ fontSize: 56 }} />
      </MotionBox>

      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
        Transforming to Web3...
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
        Our AI is building your complete blueprint. This takes about 30 seconds.
      </Typography>

      {/* Progress bar */}
      <Box sx={{ width: "100%", maxWidth: 480, mb: 3 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            mb: 1,
          }}
        />
        <Typography variant="caption" color="text.secondary">
          {Math.round(progress)}%
        </Typography>
      </Box>

      {/* Status message */}
      <Box sx={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          <MotionBox
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>{current.icon}</Typography>
            <Typography variant="body2" color="text.secondary">
              {current.text}
            </Typography>
          </MotionBox>
        </AnimatePresence>
      </Box>

      {/* Processing steps */}
      <Box sx={{ mt: 6, display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center", maxWidth: 480 }}>
        {STATUS_MESSAGES.map((msg, i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: i <= msgIndex ? "linear-gradient(135deg, #8b5cf6, #06b6d4)" : "rgba(139,92,246,0.2)",
              transition: "all 0.3s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
