"use client";

import { Box, Typography, Chip, Stack, Divider } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import ShieldIcon from "@mui/icons-material/Shield";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <CodeIcon sx={{ color: "#ec4899" }} />
        <Typography variant="h6" fontWeight={700}>Smart Contracts</Typography>
      </Box>

      {data.auditBudget && (
        <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(236,72,153,0.06)", border: "1px solid rgba(236,72,153,0.2)", mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            <Box component="span" sx={{ color: "#ec4899", fontWeight: 700 }}>Audit Budget: </Box>
            {data.auditBudget}
          </Typography>
        </Box>
      )}

      <Stack spacing={2} sx={{ mb: data.securityFeatures ? 3 : 0 }}>
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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Box>
                <Typography variant="subtitle2" fontWeight={700}>{contract.name}</Typography>
                <Chip label={contract.standard} size="small"
                  sx={{ mt: 0.5, fontSize: "0.65rem", background: "rgba(139,92,246,0.15)", color: "#a78bfa", height: 20 }} />
              </Box>
              <Box sx={{ textAlign: "right" }}>
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
                {contract.gasPerTx && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5, justifyContent: "flex-end" }}>
                    <LocalGasStationIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>{contract.gasPerTx}</Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {contract.description && (
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1, fontStyle: "italic" }}>
                {contract.description}
              </Typography>
            )}

            <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 0.5, fontSize: "0.6rem" }}>
              FUNCTIONS
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {contract.functions.map((fn) => (
                <Chip key={fn} label={fn} size="small"
                  sx={{ fontSize: "0.6rem", height: 18, fontFamily: "monospace", background: "rgba(6,182,212,0.08)", color: "#06b6d4" }} />
              ))}
            </Box>

            {contract.events && contract.events.length > 0 && (
              <>
                <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mt: 1, mb: 0.5, fontSize: "0.6rem" }}>
                  EVENTS
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {contract.events.map((ev) => (
                    <Chip key={ev} label={ev} size="small"
                      sx={{ fontSize: "0.6rem", height: 18, fontFamily: "monospace", background: "rgba(236,72,153,0.08)", color: "#ec4899" }} />
                  ))}
                </Box>
              </>
            )}
          </Box>
        ))}
      </Stack>

      {data.securityFeatures && data.securityFeatures.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <ShieldIcon sx={{ fontSize: 14, color: "#10b981" }} />
            <Typography variant="caption" fontWeight={700} color="text.secondary">SECURITY FEATURES</Typography>
          </Box>
          <Stack spacing={0.75}>
            {data.securityFeatures.map((feat, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                <Box sx={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", mt: 0.75, flexShrink: 0 }} />
                <Typography variant="caption" color="text.secondary">{feat}</Typography>
              </Box>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
}
