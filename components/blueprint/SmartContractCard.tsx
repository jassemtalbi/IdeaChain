"use client";

import { Box, Typography, Chip, Stack } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { SmartContracts } from "@/types";

const COMPLEXITY_COLOR: Record<string, string> = {
  Low: "#10b981",
  Medium: "#f59e0b",
  High: "#ef4444",
};

interface Props { data: SmartContracts; }

export default function SmartContractCard({ data }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <CodeIcon sx={{ color: "#ec4899" }} />
        <Typography variant="h6" fontWeight={700}>Smart Contracts</Typography>
      </Box>

      <Stack spacing={2}>
        {data.contracts.map((contract) => (
          <Box
            key={contract.name}
            sx={{
              p: 2,
              borderRadius: 2,
              background: "rgba(13,22,40,0.5)",
              border: "1px solid rgba(139,92,246,0.15)",
              transition: "all 0.2s",
              "&:hover": { border: "1px solid rgba(139,92,246,0.4)" },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Box>
                <Typography variant="subtitle2" fontWeight={700}>{contract.name}</Typography>
                <Chip label={contract.standard} size="small"
                  sx={{ mt: 0.5, fontSize: "0.65rem", background: "rgba(139,92,246,0.15)", color: "#a78bfa", height: 20 }} />
              </Box>
              <Chip
                label={contract.complexity}
                size="small"
                sx={{
                  fontSize: "0.65rem",
                  background: `${COMPLEXITY_COLOR[contract.complexity]}15`,
                  color: COMPLEXITY_COLOR[contract.complexity],
                  border: `1px solid ${COMPLEXITY_COLOR[contract.complexity]}30`,
                  fontWeight: 700,
                }}
              />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {contract.functions.map((fn) => (
                <Chip key={fn} label={fn} size="small"
                  sx={{ fontSize: "0.6rem", height: 18, fontFamily: "monospace", background: "rgba(6,182,212,0.08)", color: "#06b6d4" }} />
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
