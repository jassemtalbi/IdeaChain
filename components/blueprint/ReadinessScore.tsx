"use client";

import { Box, Typography, LinearProgress, Tooltip } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import { ReadinessScore as ReadinessScoreType } from "@/types";

interface Props {
  data: ReadinessScoreType;
}

function ScoreColor(score: number) {
  if (score >= 8) return "#10b981";
  if (score >= 6) return "#f59e0b";
  return "#ef4444";
}

export default function ReadinessScore({ data }: Props) {
  const color = ScoreColor(data.overall);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <SpeedIcon sx={{ color: "#8b5cf6" }} />
        <Typography variant="h6" fontWeight={700}>Readiness Score</Typography>
      </Box>

      {/* Big score display */}
      <Box sx={{ textAlign: "center", mb: 4, py: 2, background: `${color}10`, borderRadius: 3, border: `1px solid ${color}30` }}>
        <Typography sx={{ fontSize: "4rem", fontWeight: 900, color, lineHeight: 1 }}>
          {data.overall.toFixed(1)}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          / 10 READINESS
        </Typography>
      </Box>

      {/* Factors */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {data.factors.map((factor) => (
          <Tooltip key={factor.label} title={factor.note} placement="top">
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" fontWeight={600}>{factor.label}</Typography>
                <Typography variant="caption" fontWeight={700} sx={{ color: ScoreColor(factor.score) }}>
                  {factor.score}/10
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={factor.score * 10}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  "& .MuiLinearProgress-bar": {
                    background: ScoreColor(factor.score),
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}
