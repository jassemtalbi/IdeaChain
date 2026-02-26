"use client";

import { Box, Typography, LinearProgress, Tooltip, Chip } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { ReadinessScore as ReadinessScoreType } from "@/types";

interface Props {
  data: ReadinessScoreType;
}

function ScoreColor(score: number) {
  if (score >= 8) return "#10b981";
  if (score >= 6) return "#f59e0b";
  return "#ef4444";
}

const SEVERITY_COLOR: Record<string, string> = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#10b981",
};

export default function ReadinessScore({ data }: Props) {
  const color = ScoreColor(data.overall);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <SpeedIcon sx={{ color: "#8b5cf6" }} />
        <Typography variant="h6" fontWeight={700}>Readiness Score</Typography>
      </Box>

      <Box sx={{ textAlign: "center", mb: 3, py: 2, background: `${color}10`, borderRadius: 3, border: `1px solid ${color}30` }}>
        <Typography sx={{ fontSize: "4rem", fontWeight: 900, color, lineHeight: 1 }}>
          {data.overall.toFixed(1)}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          / 10 READINESS
        </Typography>
      </Box>

      {(data.marketSize || data.tvlProjection) && (
        <Box sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 1 }}>
          {data.marketSize && (
            <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.25 }}>
                <TrendingUpIcon sx={{ fontSize: 14, color: "#10b981" }} />
                <Typography variant="caption" fontWeight={700} sx={{ color: "#10b981" }}>MARKET SIZE</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">{data.marketSize}</Typography>
            </Box>
          )}
          {data.tvlProjection && (
            <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.25 }}>
                <TrendingUpIcon sx={{ fontSize: 14, color: "#06b6d4" }} />
                <Typography variant="caption" fontWeight={700} sx={{ color: "#06b6d4" }}>TVL PROJECTION</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">{data.tvlProjection}</Typography>
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
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
                  "& .MuiLinearProgress-bar": { background: ScoreColor(factor.score), borderRadius: 3 },
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block", fontSize: "0.65rem" }}>
                {factor.note}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>

      {data.risks && data.risks.length > 0 && (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <WarningAmberIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
            <Typography variant="caption" fontWeight={700} color="text.secondary">KEY RISKS & MITIGATIONS</Typography>
          </Box>
          {data.risks.map((risk, i) => (
            <Box key={i} sx={{ p: 1.5, borderRadius: 2, mb: 1, background: `${SEVERITY_COLOR[risk.severity] || "#f59e0b"}08`, border: `1px solid ${SEVERITY_COLOR[risk.severity] || "#f59e0b"}25` }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, flexWrap: "wrap" }}>
                <Typography variant="caption" fontWeight={700}>{risk.risk}</Typography>
                <Chip label={risk.severity} size="small" sx={{ fontSize: "0.6rem", height: 18, background: `${SEVERITY_COLOR[risk.severity]}20`, color: SEVERITY_COLOR[risk.severity], fontWeight: 700 }} />
              </Box>
              <Typography variant="caption" color="text.secondary">
                <Box component="span" sx={{ color: "#10b981", fontWeight: 600 }}>Mitigation: </Box>
                {risk.mitigation}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
