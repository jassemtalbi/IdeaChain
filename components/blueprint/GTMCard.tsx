"use client";

import { Box, Typography, Chip, Stack, Divider } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CheckIcon from "@mui/icons-material/Check";
import FlagIcon from "@mui/icons-material/Flag";
import { GoToMarket, GTMSegment, GTMPartnership } from "@/types";

interface Props { data: GoToMarket; }

const PHASE_COLORS = ["#8b5cf6", "#06b6d4", "#ec4899"];

export default function GTMCard({ data }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <RocketLaunchIcon sx={{ color: "#ec4899" }} />
        <Typography variant="h6" fontWeight={700}>Go-to-Market Strategy</Typography>
      </Box>

      {data.launchStrategy && (
        <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(236,72,153,0.06)", border: "1px solid rgba(236,72,153,0.2)", mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            <Box component="span" sx={{ color: "#ec4899", fontWeight: 700 }}>Launch Strategy: </Box>
            {data.launchStrategy}
          </Typography>
        </Box>
      )}

      <Stack spacing={2} sx={{ mb: 3 }}>
        {data.phases.map((phase, i) => {
          const color = PHASE_COLORS[i % PHASE_COLORS.length];
          return (
            <Box key={phase.phase} sx={{ p: 2, borderRadius: 2, border: `1px solid ${color}25`, background: `${color}06` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="caption" fontWeight={700} sx={{ color }}>
                  Phase {phase.phase}: {phase.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
                  {phase.budget && (
                    <Chip label={phase.budget} size="small" sx={{ fontSize: "0.6rem", background: "rgba(16,185,129,0.1)", color: "#10b981", height: 18 }} />
                  )}
                  <Chip label={phase.duration} size="small" sx={{ fontSize: "0.65rem", background: `${color}15`, color, height: 20 }} />
                </Box>
              </Box>

              {phase.kpis && phase.kpis.length > 0 && (
                <Box sx={{ mb: 1, p: 1, borderRadius: 1, background: "rgba(0,0,0,0.2)" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                    <FlagIcon sx={{ fontSize: 11, color }} />
                    <Typography variant="caption" fontWeight={700} sx={{ fontSize: "0.6rem", color }}>KPIs</Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {phase.kpis.map((kpi) => (
                      <Chip key={kpi} label={kpi} size="small" sx={{ fontSize: "0.58rem", height: 16, background: `${color}10`, color }} />
                    ))}
                  </Box>
                </Box>
              )}

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

      <Divider sx={{ my: 2 }} />

      {/* Target segments */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1 }}>
          TARGET SEGMENTS
        </Typography>
        <Stack spacing={0.75}>
          {data.targetSegments.map((seg, i) => {
            if (typeof seg === "string") {
              return (
                <Chip key={i} label={seg} size="small"
                  sx={{ fontSize: "0.7rem", background: "rgba(139,92,246,0.1)", color: "text.secondary", border: "1px solid rgba(139,92,246,0.2)", alignSelf: "flex-start" }} />
              );
            }
            const s = seg as GTMSegment;
            return (
              <Box key={i} sx={{ p: 1.25, borderRadius: 1.5, background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
                <Typography variant="caption" fontWeight={700}>{s.segment}</Typography>
                {s.size && <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>{s.size}</Typography>}
                {s.acquisitionChannel && (
                  <Typography variant="caption" sx={{ color: "#8b5cf6", fontSize: "0.62rem" }}>
                    Channel: {s.acquisitionChannel}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* Key partnerships */}
      <Box>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1 }}>
          KEY PARTNERSHIPS
        </Typography>
        <Stack spacing={0.75}>
          {data.keyPartnerships.map((p, i) => {
            if (typeof p === "string") {
              return (
                <Chip key={i} label={p} size="small"
                  sx={{ fontSize: "0.7rem", background: "rgba(6,182,212,0.08)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)", alignSelf: "flex-start" }} />
              );
            }
            const partner = p as GTMPartnership;
            return (
              <Box key={i} sx={{ p: 1.25, borderRadius: 1.5, background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.15)" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="caption" fontWeight={700} sx={{ color: "#06b6d4" }}>{partner.partner}</Typography>
                  {partner.type && <Chip label={partner.type} size="small" sx={{ fontSize: "0.58rem", height: 16, background: "rgba(6,182,212,0.1)", color: "#06b6d4" }} />}
                </Box>
                {partner.value && <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>{partner.value}</Typography>}
              </Box>
            );
          })}
        </Stack>
      </Box>

      {data.tokenLaunchpad && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <Typography variant="caption" color="text.secondary">
              <Box component="span" sx={{ color: "#f59e0b", fontWeight: 700 }}>Token Launch: </Box>
              {data.tokenLaunchpad}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
