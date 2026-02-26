"use client";

import { Box, Typography, Chip, Stack, Divider } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import SavingsIcon from "@mui/icons-material/Savings";
import { DAOStructure } from "@/types";

interface Props { data: DAOStructure; }

export default function DAOStructureCard({ data }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <AccountBalanceIcon sx={{ color: "#8b5cf6" }} />
        <Typography variant="h6" fontWeight={700}>DAO Structure</Typography>
      </Box>

      <Box sx={{ p: 2, borderRadius: 2, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#a78bfa", mb: 0.5 }}>Governance Model</Typography>
        <Typography variant="body2">{data.model}</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <HowToVoteIcon sx={{ fontSize: 16, color: "#06b6d4" }} />
          <Typography variant="caption" fontWeight={700} color="text.secondary">VOTING THRESHOLD</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">{data.votingThreshold}</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
          PROPOSAL TYPES
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {data.proposalTypes.map((type) => (
            <Chip key={type} label={type} size="small"
              sx={{ background: "rgba(6,182,212,0.1)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)", fontSize: "0.7rem" }} />
          ))}
        </Stack>
      </Box>

      <Box sx={{ mb: data.treasuryAllocation ? 3 : 0 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
          GOVERNANCE ROLES
        </Typography>
        {data.roles.map((role) => (
          <Box key={role.name} sx={{ mb: 1.5, p: 1.5, borderRadius: 2, background: "rgba(13,22,40,0.5)", border: "1px solid rgba(139,92,246,0.1)" }}>
            <Typography variant="caption" fontWeight={700} sx={{ color: "#8b5cf6" }}>{role.name}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>{role.description}</Typography>
          </Box>
        ))}
      </Box>

      {data.treasuryAllocation && (
        <>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <SavingsIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
            <Typography variant="caption" fontWeight={700} color="text.secondary">TREASURY ALLOCATION</Typography>
          </Box>
          {Object.entries(data.treasuryAllocation).map(([key, value]) => (
            <Box key={key} sx={{ display: "flex", justifyContent: "space-between", py: 0.75, borderBottom: "1px solid rgba(139,92,246,0.07)" }}>
              <Typography variant="caption" sx={{ textTransform: "capitalize", color: "#f59e0b" }}>{key}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: "right", maxWidth: "60%" }}>{value}</Typography>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}
