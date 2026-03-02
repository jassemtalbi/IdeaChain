"use client";

import { useState } from "react";
import { Box, Typography, LinearProgress, Tooltip, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { IdeaDNA } from "@/types";

const MotionBox = motion(Box);

interface Props { data: IdeaDNA; }

const LABEL_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  "Problem":       { bg: "rgba(239,68,68,0.1)",    border: "rgba(239,68,68,0.25)",    text: "#ef4444" },
  "Solution":      { bg: "rgba(16,185,129,0.1)",   border: "rgba(16,185,129,0.25)",   text: "#10b981" },
  "Target Market": { bg: "rgba(59,130,246,0.1)",   border: "rgba(59,130,246,0.25)",   text: "#3b82f6" },
  "Revenue Model": { bg: "rgba(249,115,22,0.1)",   border: "rgba(249,115,22,0.25)",   text: "#f97316" },
  "Moat":          { bg: "rgba(139,92,246,0.1)",   border: "rgba(139,92,246,0.25)",   text: "#8b5cf6" },
  "Token Utility": { bg: "rgba(6,182,212,0.1)",    border: "rgba(6,182,212,0.25)",    text: "#06b6d4" },
  "Network Effect":{ bg: "rgba(236,72,153,0.1)",   border: "rgba(236,72,153,0.25)",   text: "#ec4899" },
};

function getColor(label: string) {
  return LABEL_COLORS[label] || { bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)", text: "#8b5cf6" };
}

function getUniquenessLabel(score: number) {
  if (score >= 85) return "Highly Novel";
  if (score >= 70) return "Quite Original";
  if (score >= 55) return "Moderately Unique";
  return "Common Concept";
}

function getUniquenessColor(score: number) {
  if (score >= 85) return "#10b981";
  if (score >= 70) return "#8b5cf6";
  if (score >= 55) return "#f59e0b";
  return "#ef4444";
}

export default function IdeaDNACard({ data }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.fingerprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const uColor = getUniquenessColor(data.uniquenessScore);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <FingerprintIcon sx={{ color: "#8b5cf6", fontSize: 24 }} />
        <Typography variant="h6" fontWeight={700}>Idea DNA Fingerprint</Typography>
      </Box>

      {/* Fingerprint hash row */}
      <Box sx={{
        display: "flex", alignItems: "center", gap: 1.5, mb: 3,
        p: 2, borderRadius: 2,
        background: "rgba(139,92,246,0.06)",
        border: "1px solid rgba(139,92,246,0.2)",
      }}>
        <FingerprintIcon sx={{ color: "#8b5cf6", flexShrink: 0 }} />
        <Typography
          sx={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: "0.9rem", color: "#a78bfa", flex: 1,
            letterSpacing: "0.05em",
          }}
        >
          {data.fingerprint}
        </Typography>
        <Tooltip title={copied ? "Copied!" : "Copy fingerprint"}>
          <IconButton size="small" onClick={handleCopy} sx={{ color: copied ? "#10b981" : "text.secondary" }}>
            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Uniqueness score */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ letterSpacing: "0.06em", fontSize: "0.68rem" }}>
            IDEA UNIQUENESS
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="caption" sx={{ color: uColor, fontWeight: 700, fontSize: "0.85rem" }}>
              {data.uniquenessScore}%
            </Typography>
            <Typography variant="caption" sx={{
              px: 1, py: 0.25, borderRadius: 1,
              background: `${uColor}18`, color: uColor,
              border: `1px solid ${uColor}35`,
              fontSize: "0.68rem", fontWeight: 700,
            }}>
              {getUniquenessLabel(data.uniquenessScore)}
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={data.uniquenessScore}
          sx={{
            height: 8, borderRadius: 4,
            backgroundColor: "rgba(139,92,246,0.1)",
            "& .MuiLinearProgress-bar": {
              background: `linear-gradient(90deg, ${uColor}, ${uColor}99)`,
              borderRadius: 4,
            },
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75, fontSize: "0.68rem" }}>
          Compared against 10,000+ previously submitted ideas on Ideon
        </Typography>
      </Box>

      {/* 7 DNA Components */}
      <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 2, letterSpacing: "0.06em", fontSize: "0.68rem" }}>
        CORE COMPONENTS · 7 GENETIC MARKERS
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {data.components.map((comp, i) => {
          const c = getColor(comp.label);
          return (
            <MotionBox
              key={comp.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              sx={{
                p: 1.75, borderRadius: 2,
                background: c.bg,
                border: `1px solid ${c.border}`,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1, mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: c.text, flexShrink: 0,
                    boxShadow: `0 0 6px ${c.text}`,
                  }} />
                  <Typography variant="caption" fontWeight={700} sx={{ color: c.text, fontSize: "0.72rem", letterSpacing: "0.04em" }}>
                    {comp.label.toUpperCase()}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: c.text, fontWeight: 700, fontSize: "0.7rem", flexShrink: 0 }}>
                  W:{comp.weight}/10
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: "0.82rem" }}>
                {comp.value}
              </Typography>
              {/* Weight bar */}
              <LinearProgress
                variant="determinate"
                value={comp.weight * 10}
                sx={{
                  mt: 1.25, height: 3, borderRadius: 2,
                  backgroundColor: `${c.text}18`,
                  "& .MuiLinearProgress-bar": { background: c.text, borderRadius: 2 },
                }}
              />
            </MotionBox>
          );
        })}
      </Box>
    </Box>
  );
}
