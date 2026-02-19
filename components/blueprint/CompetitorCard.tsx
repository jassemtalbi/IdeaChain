"use client";

import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { CompetitorAnalysis } from "@/types";

interface Props { data: CompetitorAnalysis; }

export default function CompetitorCard({ data }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <ManageSearchIcon sx={{ color: "#06b6d4" }} />
        <Typography variant="h6" fontWeight={700}>Competitor Analysis</Typography>
      </Box>

      {/* Mobile view */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {data.competitors.map((c) => (
          <Box key={c.name} sx={{ p: 2, mb: 2, borderRadius: 2, border: "1px solid rgba(139,92,246,0.15)", background: "rgba(13,22,40,0.5)" }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#ec4899", mb: 1 }}>{c.name}</Typography>
            <Typography variant="caption" color="text.secondary"><Box component="span" fontWeight={700}>Web2: </Box>{c.web2Model}</Typography>
            <Typography variant="caption" color="#06b6d4" sx={{ display: "block", mt: 0.5 }}><Box component="span" fontWeight={700}>Web3 Edge: </Box>{c.web3Advantage}</Typography>
            <Typography variant="caption" color="#10b981" sx={{ display: "block", mt: 0.5 }}><Box component="span" fontWeight={700}>Your Advantage: </Box>{c.yourEdge}</Typography>
          </Box>
        ))}
      </Box>

      {/* Desktop view */}
      <Box sx={{ display: { xs: "none", sm: "block" }, overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {["Competitor", "Web2 Model", "Web3 Advantage", "Your Edge"].map((h) => (
                <TableCell key={h} sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: 1, borderColor: "rgba(139,92,246,0.15)" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.competitors.map((c) => (
              <TableRow key={c.name} sx={{ "&:hover": { background: "rgba(139,92,246,0.04)" } }}>
                <TableCell sx={{ fontWeight: 700, color: "#ec4899", borderColor: "rgba(139,92,246,0.08)", whiteSpace: "nowrap" }}>
                  {c.name}
                </TableCell>
                <TableCell sx={{ color: "text.secondary", fontSize: "0.75rem", borderColor: "rgba(139,92,246,0.08)" }}>
                  {c.web2Model}
                </TableCell>
                <TableCell sx={{ color: "#06b6d4", fontSize: "0.75rem", borderColor: "rgba(139,92,246,0.08)" }}>
                  {c.web3Advantage}
                </TableCell>
                <TableCell sx={{ color: "#10b981", fontSize: "0.75rem", borderColor: "rgba(139,92,246,0.08)" }}>
                  {c.yourEdge}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
