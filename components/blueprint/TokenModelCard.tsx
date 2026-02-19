"use client";

import { Box, Typography, Chip, Divider } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import TokenIcon from "@mui/icons-material/Token";
import { TokenModel } from "@/types";

interface Props { data: TokenModel; }

export default function TokenModelCard({ data }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <TokenIcon sx={{ color: "#8b5cf6" }} />
        <Typography variant="h6" fontWeight={700}>Token Model</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Chip label={`$${data.symbol}`} sx={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa", fontWeight: 700, fontSize: "1rem" }} />
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>{data.name}</Typography>
          <Typography variant="caption" color="text.secondary">Total Supply: {data.totalSupply}</Typography>
        </Box>
      </Box>

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
              formatter={(value: number) => [`${value}%`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
        {data.distribution.map((d) => (
          <Box key={d.label} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: d.color }} />
            <Typography variant="caption" color="text.secondary">
              {d.label} <Box component="span" sx={{ color: d.color, fontWeight: 700 }}>{d.percentage}%</Box>
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Vesting */}
      <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1 }}>
        VESTING SCHEDULE
      </Typography>
      {Object.entries(data.vestingSchedule).map(([key, val]) => (
        <Box key={key} sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>{key}</Typography>
          <Typography variant="caption" color="text.secondary">
            {val.percentage}% · {val.cliffMonths}mo cliff · {val.vestingMonths}mo vest
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
