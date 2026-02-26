"use client";

import { useState } from "react";
import {
  Box, Typography, Button, Paper, Avatar, Chip, TextField,
  LinearProgress, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert,
} from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DAOProposal, DAOVoteChoice } from "@/types";
import { formatRelativeDate } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { API_BASE, authHeaders } from "@/lib/fetchWithAuth";

interface Props {
  ideaId: string;
}

function timeLeft(endsAt: string) {
  const ms = new Date(endsAt).getTime() - Date.now();
  if (ms <= 0) return "Ended";
  const days = Math.floor(ms / 86400_000);
  const hours = Math.floor((ms % 86400_000) / 3600_000);
  if (days > 0) return `${days}d ${hours}h left`;
  return `${hours}h left`;
}

function VoteBar({ proposal, onVote }: { proposal: DAOProposal; onVote: (choice: DAOVoteChoice) => void }) {
  const total = (proposal.votesFor ?? 0) + (proposal.votesAgainst ?? 0) + (proposal.votesAbstain ?? 0);
  const pct = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0;
  const forPct = pct(proposal.votesFor ?? 0);
  const againstPct = pct(proposal.votesAgainst ?? 0);
  const abstainPct = pct(proposal.votesAbstain ?? 0);

  const isOpen = proposal.status === "open" && new Date(proposal.endsAt) > new Date();
  const userVote = proposal.userVote;

  return (
    <Box>
      {/* Vote counts */}
      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: "#10b981", fontWeight: 600 }}>For</Typography>
            <Typography variant="caption" sx={{ color: "#10b981" }}>{forPct}% ({proposal.votesFor ?? 0})</Typography>
          </Box>
          <LinearProgress variant="determinate" value={forPct}
            sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(16,185,129,0.1)", "& .MuiLinearProgress-bar": { bgcolor: "#10b981", borderRadius: 3 } }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: "#ec4899", fontWeight: 600 }}>Against</Typography>
            <Typography variant="caption" sx={{ color: "#ec4899" }}>{againstPct}% ({proposal.votesAgainst ?? 0})</Typography>
          </Box>
          <LinearProgress variant="determinate" value={againstPct}
            sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(236,72,153,0.1)", "& .MuiLinearProgress-bar": { bgcolor: "#ec4899", borderRadius: 3 } }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>Abstain</Typography>
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>{abstainPct}% ({proposal.votesAbstain ?? 0})</Typography>
          </Box>
          <LinearProgress variant="determinate" value={abstainPct}
            sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(148,163,184,0.1)", "& .MuiLinearProgress-bar": { bgcolor: "#94a3b8", borderRadius: 3 } }} />
        </Box>
      </Stack>

      {/* Vote buttons */}
      {isOpen && (
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {(["for", "against", "abstain"] as DAOVoteChoice[]).map((choice) => {
            const active = userVote === choice;
            const icons = { for: <CheckCircleIcon fontSize="small" />, against: <CancelIcon fontSize="small" />, abstain: <RemoveCircleOutlineIcon fontSize="small" /> };
            const colors = { for: "#10b981", against: "#ec4899", abstain: "#94a3b8" };
            const labels = { for: "For", against: "Against", abstain: "Abstain" };
            return (
              <Button key={choice} size="small" variant={active ? "contained" : "outlined"}
                startIcon={icons[choice]}
                onClick={() => onVote(choice)}
                sx={{
                  borderColor: active ? colors[choice] : `${colors[choice]}55`,
                  color: active ? "#fff" : colors[choice],
                  bgcolor: active ? colors[choice] : "transparent",
                  "&:hover": { borderColor: colors[choice], bgcolor: `${colors[choice]}22` },
                  fontWeight: 600, fontSize: "0.75rem",
                }}
              >{labels[choice]}</Button>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}

function ProposalCard({ proposal, onVote }: { proposal: DAOProposal; onVote: (proposalId: string, choice: DAOVoteChoice) => void }) {
  const isOpen = proposal.status === "open" && new Date(proposal.endsAt) > new Date();
  const statusColor = { open: "#8b5cf6", passed: "#10b981", rejected: "#ec4899", expired: "#94a3b8" }[proposal.status] ?? "#94a3b8";

  return (
    <Paper sx={{ p: 3, background: "rgba(13,22,40,0.6)", border: "1px solid rgba(139,92,246,0.15)", mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5, gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>{proposal.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.6 }}>{proposal.description}</Typography>
        </Box>
        <Chip label={proposal.status.toUpperCase()} size="small"
          sx={{ bgcolor: `${statusColor}22`, color: statusColor, border: `1px solid ${statusColor}55`, fontWeight: 700, fontSize: "0.65rem", flexShrink: 0 }} />
      </Box>

      <VoteBar proposal={proposal} onVote={(choice) => onVote(proposal.id, choice)} />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, pt: 2, borderTop: "1px solid rgba(139,92,246,0.08)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={proposal.author?.avatar ?? undefined} sx={{ width: 20, height: 20, fontSize: "0.6rem" }}>
            {proposal.author?.name?.[0]}
          </Avatar>
          <Typography variant="caption" color="text.secondary">{proposal.author?.name || "Anonymous"}</Typography>
          <Typography variant="caption" color="text.secondary">· {formatRelativeDate(proposal.createdAt)}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AccessTimeIcon sx={{ fontSize: 12, color: isOpen ? "#8b5cf6" : "text.secondary" }} />
          <Typography variant="caption" sx={{ color: isOpen ? "#8b5cf6" : "text.secondary" }}>{timeLeft(proposal.endsAt)}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default function DAOVoting({ ideaId }: Props) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDuration, setNewDuration] = useState(7);
  const [error, setError] = useState("");

  const { data: proposals = [], isLoading } = useQuery<DAOProposal[]>({
    queryKey: ["dao-proposals", ideaId],
    queryFn: async () => {
      const res = await fetch(API_BASE + "/api/dao/proposals?ideaId=" + ideaId, { headers: authHeaders() });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(API_BASE + "/api/dao/proposals", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ ideaId, title: newTitle, description: newDesc, durationDays: newDuration }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dao-proposals", ideaId] });
      setDialogOpen(false);
      setNewTitle("");
      setNewDesc("");
      setNewDuration(7);
      setError("");
    },
    onError: (e: Error) => setError(e.message),
  });

  const voteMutation = useMutation({
    mutationFn: async ({ proposalId, choice }: { proposalId: string; choice: DAOVoteChoice }) => {
      const res = await fetch(API_BASE + "/api/dao/votes", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ proposalId, choice }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dao-proposals", ideaId] }),
  });

  const handleVote = (proposalId: string, choice: DAOVoteChoice) => {
    if (!isAuthenticated) return;
    voteMutation.mutate({ proposalId, choice });
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HowToVoteIcon sx={{ color: "#8b5cf6" }} />
          <Typography variant="h6" fontWeight={700}>DAO Governance</Typography>
          <Chip label={`${proposals.length} proposals`} size="small"
            sx={{ bgcolor: "rgba(139,92,246,0.12)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)", fontSize: "0.7rem" }} />
        </Box>
        {isAuthenticated && (
          <Button size="small" variant="outlined" startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{ borderColor: "rgba(139,92,246,0.4)", color: "#8b5cf6", "&:hover": { borderColor: "#8b5cf6", bgcolor: "rgba(139,92,246,0.08)" } }}>
            New Proposal
          </Button>
        )}
      </Box>

      {!isAuthenticated && (
        <Alert severity="info" sx={{ mb: 3, bgcolor: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "text.secondary" }}>
          Sign in to create proposals and vote on governance decisions
        </Alert>
      )}

      {isLoading ? (
        <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>Loading proposals...</Typography>
      ) : proposals.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 6, border: "1px dashed rgba(139,92,246,0.2)", borderRadius: 2 }}>
          <HowToVoteIcon sx={{ fontSize: 40, color: "rgba(139,92,246,0.3)", mb: 1 }} />
          <Typography color="text.secondary">No governance proposals yet.</Typography>
          {isAuthenticated && (
            <Button size="small" onClick={() => setDialogOpen(true)} sx={{ mt: 1.5, color: "#8b5cf6" }}>
              Create the first proposal
            </Button>
          )}
        </Box>
      ) : (
        proposals.map((p) => (
          <ProposalCard key={p.id} proposal={p} onVote={handleVote} />
        ))
      )}

      {/* Create Proposal Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { background: "#0d1628", border: "1px solid rgba(139,92,246,0.3)" } }}>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: "1px solid rgba(139,92,246,0.15)" }}>
          New Governance Proposal
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField fullWidth label="Proposal Title" value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Add liquidity mining rewards"
            sx={{ mb: 2 }} size="small" />
          <TextField fullWidth label="Description" value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Describe the proposal, rationale, and expected impact..."
            multiline rows={4} sx={{ mb: 2 }} size="small" />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>Voting duration:</Typography>
            {[3, 7, 14].map((d) => (
              <Chip key={d} label={`${d} days`} size="small" clickable
                onClick={() => setNewDuration(d)}
                sx={{
                  bgcolor: newDuration === d ? "rgba(139,92,246,0.25)" : "transparent",
                  border: newDuration === d ? "1px solid #8b5cf6" : "1px solid rgba(139,92,246,0.25)",
                  color: newDuration === d ? "#a78bfa" : "text.secondary",
                }} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, borderTop: "1px solid rgba(139,92,246,0.15)" }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: "text.secondary" }}>Cancel</Button>
          <Button variant="contained" onClick={() => createMutation.mutate()}
            disabled={!newTitle.trim() || !newDesc.trim() || createMutation.isPending}
            sx={{ background: "linear-gradient(135deg,#8b5cf6,#6d28d9)" }}>
            {createMutation.isPending ? "Creating..." : "Create Proposal"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
