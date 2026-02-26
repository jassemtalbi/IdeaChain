"use client";

import { Box, Typography, Chip, Grid } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { RecommendedBlockchain } from "@/types";

interface Props { data: RecommendedBlockchain; }

export default function BlockchainCard({ data }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <LinkIcon sx={{ color: "#06b6d4" }} />
        <Typography variant="h6" fontWeight={700}>Recommended Blockchain</Typography>
      </Box>

      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(139,92,246,0.08) 100%)",
          border: "1px solid rgba(6,182,212,0.3)",
          mb: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight={800} sx={{ color: "#06b6d4", mb: 1 }}>
          {data.primary}
        </Typography>
        <Chip label="PRIMARY RECOMMENDATION" size="small"
          sx={{ background: "rgba(6,182,212,0.15)", color: "#06b6d4", fontSize: "0.65rem", fontWeight: 700 }} />
      </Box>

      {/* Metrics row */}
      {(data.gasEstimate || data.tps) && (
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {data.gasEstimate && (
            <Grid item xs={6}>
              <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", textAlign: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, mb: 0.25 }}>
                  <LocalGasStationIcon sx={{ fontSize: 12, color: "#10b981" }} />
                  <Typography variant="caption" fontWeight={700} sx={{ color: "#10b981", fontSize: "0.6rem" }}>GAS/TX</Typography>
                </Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#10b981" }}>{data.gasEstimate}</Typography>
              </Box>
            </Grid>
          )}
          {data.tps && (
            <Grid item xs={6}>
              <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", textAlign: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, mb: 0.25 }}>
                  <BoltIcon sx={{ fontSize: 12, color: "#8b5cf6" }} />
                  <Typography variant="caption" fontWeight={700} sx={{ color: "#8b5cf6", fontSize: "0.6rem" }}>TPS</Typography>
                </Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#8b5cf6" }}>{data.tps.split(" ")[0]}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1 }}>WHY THIS CHAIN</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{data.reason}</Typography>
      </Box>

      {data.ecosystem && (
        <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.15)", mb: 2 }}>
          <Typography variant="caption" fontWeight={700} sx={{ color: "#06b6d4", display: "block", mb: 0.5 }}>ECOSYSTEM</Typography>
          <Typography variant="caption" color="text.secondary">{data.ecosystem}</Typography>
        </Box>
      )}

      {data.alternatives.length > 0 && (
        <Box sx={{ mb: data.bridges ? 2 : 0 }}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
            ALTERNATIVES
          </Typography>
          {data.alternatives.map((alt) => (
            <Box key={alt.name} sx={{ display: "flex", gap: 1.5, mb: 1.5, p: 1.5, borderRadius: 2, background: "rgba(13,22,40,0.5)", border: "1px solid rgba(139,92,246,0.1)" }}>
              <CheckCircleIcon sx={{ fontSize: 16, color: "#8b5cf6", mt: 0.2, flexShrink: 0 }} />
              <Box>
                <Typography variant="caption" fontWeight={700}>{alt.name}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>{alt.tradeoff}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {data.bridges && data.bridges.length > 0 && (
        <Box>
          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1 }}>
            CROSS-CHAIN BRIDGES
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {data.bridges.map((bridge) => (
              <Chip key={bridge} label={bridge} size="small"
                sx={{ fontSize: "0.68rem", background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
