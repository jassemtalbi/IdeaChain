"use client";

import { Box, Typography, Chip, Divider, Grid } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import TokenIcon from "@mui/icons-material/Token";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { TokenModel } from "@/types";

interface Props { data: TokenModel; }

export default function TokenModelCard({ data }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <TokenIcon sx={{ color: "#8b5cf6" }} />
        <Typography variant="h6" fontWeight={700}>Token Model</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Chip label={`$${data.symbol}`} sx={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa", fontWeight: 700, fontSize: "1rem" }} />
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>{data.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            Total Supply: {data.totalSupply}
            {data.type && <Box component="span" sx={{ ml: 1, color: "#8b5cf6" }}>· {data.type}</Box>}
          </Typography>
        </Box>
      </Box>

      {/* Key metrics row */}
      {(data.initialPrice || data.fullyDilutedValuation || data.stakingYield) && (
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {data.initialPrice && (
            <Grid item xs={6} sm={4}>
              <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Seed Price</Typography>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#10b981" }}>{data.initialPrice}</Typography>
              </Box>
            </Grid>
          )}
          {data.fullyDilutedValuation && (
            <Grid item xs={6} sm={4}>
              <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>FDV</Typography>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#8b5cf6" }}>
                  {typeof data.fullyDilutedValuation === "string" ? data.fullyDilutedValuation.split(" ")[0] : data.fullyDilutedValuation}
                </Typography>
              </Box>
            </Grid>
          )}
          {data.stakingYield && (
            <Grid item xs={12} sm={4}>
              <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Staking APY</Typography>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#06b6d4" }}>
                  {data.stakingYield.split(" ")[0]}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Pie chart */}
      <Box sx={{ height: 180, mb: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.distribution}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="percentage"
            >
              {data.distribution.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "#0d1628", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 8 }}
              formatter={(value) => [`${value}%`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
        {data.distribution.map((d) => (
          <Box key={d.label} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: d.color }} />
            <Typography variant="caption" color="text.secondary">
              {d.label} <Box component="span" sx={{ color: d.color, fontWeight: 700 }}>{d.percentage}%</Box>
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Revenue model */}
      {data.revenueModel && (
        <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
            <MonetizationOnIcon sx={{ fontSize: 14, color: "#f97316" }} />
            <Typography variant="caption" fontWeight={700} sx={{ color: "#f97316" }}>REVENUE MODEL</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">{data.revenueModel}</Typography>
        </Box>
      )}

      {/* Burn mechanism */}
      {data.burnMechanism && (
        <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
            <LocalFireDepartmentIcon sx={{ fontSize: 14, color: "#ef4444" }} />
            <Typography variant="caption" fontWeight={700} sx={{ color: "#ef4444" }}>BURN MECHANISM</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">{data.burnMechanism}</Typography>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Vesting */}
      <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1 }}>
        VESTING SCHEDULE
      </Typography>
      {Object.entries(data.vestingSchedule).map(([key, val]) => (
        <Box key={key} sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>{key.replace(/([A-Z])/g, " $1")}</Typography>
          <Typography variant="caption" color="text.secondary">
            {val.percentage}% · {val.cliffMonths}mo cliff · {val.vestingMonths}mo vest
          </Typography>
        </Box>
      ))}

      {/* Fundraising rounds */}
      {data.fundraisingRounds && data.fundraisingRounds.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
            FUNDRAISING ROUNDS
          </Typography>
          <Grid container spacing={1}>
            {data.fundraisingRounds.map((round) => (
              <Grid item xs={6} key={round.round}>
                <Box sx={{ p: 1.5, borderRadius: 2, background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
                  <Typography variant="caption" fontWeight={700} sx={{ color: "#8b5cf6", display: "block" }}>{round.round}</Typography>
                  <Typography variant="caption" color="text.secondary">{round.raise} raised</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>{round.tokenPrice}/token</Typography>
                  <Typography variant="caption" sx={{ color: "#10b981" }}>Val: {round.valuation}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}
