"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography, LinearProgress, Chip } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SendIcon from "@mui/icons-material/Send";

const EXAMPLES = [
  "Airbnb for coworking spaces",
  "Uber but owned by the drivers",
  "Spotify where artists own their music",
  "LinkedIn where your reputation is a portable NFT",
  "Fiverr without the 20% platform cut",
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

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="overline" sx={{ color: "#8b5cf6", fontWeight: 700, letterSpacing: 3 }}>
        STEP 1
      </Typography>
      <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5, mb: 1 }}>
        Describe your Web2 startup idea
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Write it as you'd explain it to a friend. The AI handles all the Web3 translation.
      </Typography>

      {/* Example prompts */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {EXAMPLES.map((ex) => (
          <Chip
            key={ex}
            label={ex}
            size="small"
            onClick={() => setIdea(ex)}
            sx={{
              cursor: "pointer",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              color: "text.secondary",
              "&:hover": { background: "rgba(139,92,246,0.2)", color: "text.primary" },
            }}
          />
        ))}
      </Box>

      <TextField
        fullWidth
        multiline
        rows={5}
        value={idea}
        onChange={(e) => setIdea(e.target.value.slice(0, MAX_CHARS))}
        placeholder="e.g. A peer-to-peer marketplace where freelancers own their reputation as NFTs and clients pay through smart contract escrow..."
        disabled={loading}
        sx={{
          mb: 1,
          "& .MuiInputBase-root": {
            fontSize: "1rem",
            lineHeight: 1.6,
            background: "rgba(13,22,40,0.8)",
          },
        }}
      />

      {/* Char counter */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <LinearProgress
            variant="determinate"
            value={charPercent}
            sx={{
              height: 3,
              "& .MuiLinearProgress-bar": {
                background: charPercent > 90 ? "#ef4444" : "linear-gradient(90deg, #8b5cf6, #06b6d4)",
              },
            }}
          />
        </Box>
        <Typography variant="caption" color={idea.length > 450 ? "error" : "text.secondary"}>
          {idea.length} / {MAX_CHARS}
        </Typography>
      </Box>

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={!idea.trim() || loading}
        startIcon={loading ? <AutoAwesomeIcon sx={{ animation: "spin 1s linear infinite", "@keyframes spin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } } }} /> : <SendIcon />}
        sx={{
          py: 2,
          fontSize: "1.05rem",
          background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
          boxShadow: "0 0 24px rgba(139,92,246,0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            boxShadow: "0 0 40px rgba(139,92,246,0.55)",
          },
          "&:disabled": {
            background: "rgba(139,92,246,0.2)",
            color: "rgba(255,255,255,0.3)",
          },
        }}
      >
        {loading ? "Transforming to Web3..." : "Transform to Web3 Blueprint →"}
      </Button>
    </Box>
  );
}
