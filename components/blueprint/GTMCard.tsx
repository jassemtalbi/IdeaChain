"use client";

import { Box, Typography, Chip, Stack } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CheckIcon from "@mui/icons-material/Check";
import { GoToMarket } from "@/types";

interface Props { data: GoToMarket; }

const PHASE_COLORS = ["#8b5cf6", "#06b6d4", "#ec4899"];

export default function GTMCard({ data }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <RocketLaunchIcon sx={{ color: "#ec4899" }} />
        <Typography variant="h6" fontWeight={700}>Go-to-Market Strategy</Typography>
      </Box>

      {/* Phases */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        {data.phases.map((phase, i) => {
          const color = PHASE_COLORS[i % PHASE_COLORS.length];
          return (
            <Box key={phase.phase} sx={{ p: 2, borderRadius: 2, border: `1px solid ${color}25`, background: `${color}06` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="caption" fontWeight={700} sx={{ color }}>
                  Phase {phase.phase}: {phase.title}
                </Typography>
                <Chip label={phase.duration} size="small"
                  sx={{ fontSize: "0.65rem", background: `${color}15`, color, height: 20 }} />
              </Box>
              {phase.actions.map((action) => (
                <Box key={action} sx={{ display: "flex", gap: 1, mt: 0.75 }}>
                  <CheckIcon sx={{ fontSize: 14, color, mt: 0.25, flexShrink: 0 }} />
                  <Typography variant="caption" color="text.secondary">{action}</Typography>
                </Box>
              ))}
            </Box>
          );
        })}
      </Stack>

      {/* Target segments */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1 }}>
          TARGET SEGMENTS
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {data.targetSegments.map((seg) => (
            <Chip key={seg} label={seg} size="small"
              sx={{ fontSize: "0.7rem", background: "rgba(139,92,246,0.1)", color: "text.secondary", border: "1px solid rgba(139,92,246,0.2)" }} />
          ))}
        </Box>
      </Box>

      {/* Key partnerships */}
      <Box>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1 }}>
          KEY PARTNERSHIPS
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {data.keyPartnerships.map((p) => (
            <Chip key={p} label={p} size="small"
              sx={{ fontSize: "0.7rem", background: "rgba(6,182,212,0.08)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
