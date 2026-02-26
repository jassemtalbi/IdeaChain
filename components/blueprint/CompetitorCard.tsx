"use client";

import { Box, Typography, Chip, Stack, Divider } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ShieldIcon from "@mui/icons-material/Shield";
import { CompetitorAnalysis } from "@/types";

interface Props { data: CompetitorAnalysis; }

export default function CompetitorCard({ data }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <ManageSearchIcon sx={{ color: "#06b6d4" }} />
        <Typography variant="h6" fontWeight={700}>Competitor Analysis</Typography>
      </Box>

      {data.marketShare && (
        <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)", mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            <Box component="span" sx={{ color: "#06b6d4", fontWeight: 700 }}>Market Overview: </Box>
            {data.marketShare}
          </Typography>
        </Box>
      )}

      <Stack spacing={2}>
        {data.competitors.map((c) => (
          <Box key={c.name} sx={{ p: 2, borderRadius: 2, border: "1px solid rgba(139,92,246,0.15)", background: "rgba(13,22,40,0.5)", "&:hover": { border: "1px solid rgba(139,92,246,0.3)" }, transition: "all 0.2s" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#ec4899" }}>{c.name}</Typography>
              <Box sx={{ textAlign: "right" }}>
                {c.valuation && (
                  <Typography variant="caption" sx={{ color: "#10b981", fontWeight: 700, display: "block" }}>{c.valuation}</Typography>
                )}
                {c.monthlyActiveUsers && (
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>{c.monthlyActiveUsers}</Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>Web2 Model: </Box>{c.web2Model}
              </Typography>
              <Typography variant="caption" sx={{ color: "#06b6d4" }}>
                <Box component="span" fontWeight={700}>Web3 Advantage: </Box>{c.web3Advantage}
              </Typography>
              <Typography variant="caption" sx={{ color: "#10b981" }}>
                <Box component="span" fontWeight={700}>Your Edge: </Box>{c.yourEdge}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      {data.web3Competitors && data.web3Competitors.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
            WEB3 COMPETITORS
          </Typography>
          {data.web3Competitors.map((wc) => (
            <Box key={wc.name} sx={{ p: 1.5, borderRadius: 2, mb: 1, background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                <Typography variant="caption" fontWeight={700} sx={{ color: "#8b5cf6" }}>{wc.name}</Typography>
                {wc.tvl && <Chip label={wc.tvl} size="small" sx={{ fontSize: "0.6rem", height: 18, background: "rgba(16,185,129,0.1)", color: "#10b981" }} />}
              </Box>
              <Typography variant="caption" color="text.secondary">{wc.differentiator}</Typography>
            </Box>
          ))}
        </>
      )}

      {data.moat && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
              <ShieldIcon sx={{ fontSize: 14, color: "#10b981" }} />
              <Typography variant="caption" fontWeight={700} sx={{ color: "#10b981" }}>COMPETITIVE MOAT</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">{data.moat}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
