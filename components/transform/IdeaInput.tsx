"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography, LinearProgress, Chip } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BoltIcon from "@mui/icons-material/Bolt";
import TokenIcon from "@mui/icons-material/Token";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CodeIcon from "@mui/icons-material/Code";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const MotionBox = motion(Box);

const EXAMPLES = [
  "Airbnb for coworking spaces",
  "Uber but owned by the drivers",
  "Spotify where artists own their music",
  "LinkedIn reputation as a portable NFT",
  "Fiverr without the 20% platform cut",
];

const BLUEPRINT_OUTPUTS = [
  { icon: <TokenIcon sx={{ fontSize: 13 }} />, label: "Token Model" },
  { icon: <AccountBalanceIcon sx={{ fontSize: 13 }} />, label: "DAO Structure" },
  { icon: <CodeIcon sx={{ fontSize: 13 }} />, label: "Smart Contracts" },
  { icon: <TrendingUpIcon sx={{ fontSize: 13 }} />, label: "Market Analysis" },
];

const MAX_CHARS = 500;

interface IdeaInputProps {
  onSubmit: (idea: string) => void;
  loading: boolean;
}

export default function IdeaInput({ onSubmit, loading }: IdeaInputProps) {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || loading) return;
    onSubmit(idea.trim());
  };

  const charPercent = (idea.length / MAX_CHARS) * 100;
  const isNearLimit = idea.length > 440;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Section label */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Box sx={{
          width: 28, height: 28, borderRadius: "8px",
          background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 12px rgba(139,92,246,0.4)",
        }}>
          <Typography variant="caption" fontWeight={800} sx={{ color: "#fff", fontSize: "0.75rem" }}>1</Typography>
        </Box>
        <Typography variant="overline" sx={{ color: "#8b5cf6", fontWeight: 700, letterSpacing: "0.12em", fontSize: "0.7rem" }}>
          YOUR IDEA
        </Typography>
      </Box>

      <Typography variant="h5" fontWeight={700} sx={{ mb: 0.75, letterSpacing: "-0.01em" }}>
        Describe your startup idea
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.65 }}>
        Write it naturally — as if explaining to a friend. Our AI handles all the Web3 translation.
      </Typography>

      {/* What you'll get */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {BLUEPRINT_OUTPUTS.map((item) => (
          <Box key={item.label} sx={{
            display: "flex", alignItems: "center", gap: 0.5,
            px: 1.25, py: 0.5, borderRadius: 1.5,
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.18)",
            color: "rgba(167,139,250,0.85)",
          }}>
            {item.icon}
            <Typography variant="caption" fontWeight={600} sx={{ fontSize: "0.7rem" }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Textarea */}
      <TextField
        fullWidth
        multiline
        rows={6}
        value={idea}
        onChange={(e) => setIdea(e.target.value.slice(0, MAX_CHARS))}
        placeholder="e.g. A peer-to-peer marketplace where freelancers own their reputation as NFTs and clients pay through smart contract escrow, removing all middlemen..."
        disabled={loading}
        sx={{
          mb: 1.5,
          "& .MuiInputBase-root": {
            fontSize: "0.95rem",
            lineHeight: 1.7,
            background: "rgba(13,22,40,0.8)",
            borderRadius: 2,
          },
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(148,163,184,0.45)",
            fontSize: "0.9rem",
          },
        }}
      />

      {/* Char counter row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <LinearProgress
            variant="determinate"
            value={charPercent}
            sx={{
              height: 3, borderRadius: 2,
              backgroundColor: "rgba(139,92,246,0.1)",
              "& .MuiLinearProgress-bar": {
                background: isNearLimit
                  ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                  : "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                borderRadius: 2,
              },
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: isNearLimit ? "#ef4444" : "text.secondary", fontWeight: 600, minWidth: 52, textAlign: "right", fontSize: "0.72rem" }}>
          {idea.length} / {MAX_CHARS}
        </Typography>
      </Box>

      {/* Example prompts */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1, fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.06em" }}>
          TRY AN EXAMPLE:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {EXAMPLES.map((ex) => (
            <Chip
              key={ex}
              label={ex}
              size="small"
              onClick={() => setIdea(ex)}
              sx={{
                cursor: "pointer", fontSize: "0.7rem", height: 26,
                background: "rgba(13,22,40,0.7)",
                border: "1px solid rgba(139,92,246,0.2)",
                color: "text.secondary",
                "&:hover": { background: "rgba(139,92,246,0.12)", color: "#a78bfa", borderColor: "rgba(139,92,246,0.4)" },
                transition: "all 0.2s",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Submit */}
      <MotionBox whileHover={!loading && idea.trim() ? { scale: 1.01 } : {}} whileTap={!loading && idea.trim() ? { scale: 0.99 } : {}}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={!idea.trim() || loading}
          startIcon={
            loading
              ? <AutoAwesomeIcon sx={{
                  animation: "spin 1s linear infinite",
                  "@keyframes spin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
                }} />
              : <BoltIcon />
          }
          sx={{
            py: 2, fontSize: "1rem", fontWeight: 700, borderRadius: 2,
            background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
            boxShadow: "0 0 28px rgba(139,92,246,0.4)",
            letterSpacing: "0.01em",
            "&:hover": {
              background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
              boxShadow: "0 0 44px rgba(139,92,246,0.6)",
            },
            "&:disabled": {
              background: "rgba(139,92,246,0.18)",
              color: "rgba(255,255,255,0.25)",
              boxShadow: "none",
            },
          }}
        >
          {loading ? "Generating Blueprint..." : "Generate Web3 Blueprint"}
        </Button>
      </MotionBox>

      {!loading && (
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 1.5, fontSize: "0.7rem" }}>
          Powered by Llama 3.3 · ~30 second generation
        </Typography>
      )}
    </Box>
  );
}
