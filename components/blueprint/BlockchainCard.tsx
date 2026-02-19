"use client";

import { Box, Typography, Chip } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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

      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1 }}>WHY THIS CHAIN</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{data.reason}</Typography>
      </Box>

      {data.alternatives.length > 0 && (
        <Box>
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
    </Box>
  );
}
