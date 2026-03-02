"use client";

import { useState } from "react";
import {
  Box, Typography, Button, Paper, Avatar, Chip, TextField,
  Stack, Dialog, DialogTitle, DialogContent, DialogActions,
  Alert, IconButton, Tooltip, Divider, Tab, Tabs,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CodeIcon from "@mui/icons-material/Code";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bounty, BountySubmission, LeaderboardEntry } from "@/types";
import { formatRelativeDate } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { API_BASE, authHeaders } from "@/lib/fetchWithAuth";

interface Props {
  ideaId: string;
  authorId: string;
}

const STATUS_COLOR: Record<string, string> = {
  open: "#f59e0b",
  claimed: "#06b6d4",
  submitted: "#8b5cf6",
  completed: "#10b981",
  cancelled: "#94a3b8",
};

function deadlineLeft(deadline: string) {
  const ms = new Date(deadline).getTime() - Date.now();
  if (ms <= 0) return "Expired";
  const days = Math.floor(ms / 86400_000);
  const hours = Math.floor((ms % 86400_000) / 3600_000);
  if (days > 0) return `${days}d ${hours}h left`;
  return `${hours}h left`;
}

// ── Submission Card ──────────────────────────────────────────────────────────
function SubmissionCard({
  submission,
  bountyId,
  canVote,
  isIdeaAuthor,
  onVote,
  onAccept,
}: {
  submission: BountySubmission;
  bountyId: string;
  canVote: boolean;
  isIdeaAuthor: boolean;
  onVote: (bountyId: string, subId: string, choice: "approve" | "reject") => void;
  onAccept: (bountyId: string, subId: string) => void;
}) {
  const subStatusColor = { pending: "#f59e0b", accepted: "#10b981", rejected: "#ef4444" }[submission.status];
  const total = submission.approvalsCount + submission.rejectionsCount;
  const approvePct = total > 0 ? Math.round((submission.approvalsCount / total) * 100) : 0;

  return (
    <Box sx={{
      p: 2, borderRadius: 2, mb: 1.5,
      background: submission.status === "accepted"
        ? "rgba(16,185,129,0.05)"
        : "rgba(13,22,40,0.5)",
      border: `1px solid ${submission.status === "accepted" ? "rgba(16,185,129,0.25)" : "rgba(139,92,246,0.1)"}`,
    }}>
      {/* Dev info + PR link */}
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1, mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={submission.developer?.avatar} sx={{ width: 24, height: 24, fontSize: "0.65rem" }}>
            {submission.developer?.name?.[0]}
          </Avatar>
          <Typography variant="caption" fontWeight={700}>{submission.developer?.name || "Developer"}</Typography>
          <Typography variant="caption" color="text.secondary">· {formatRelativeDate(submission.submittedAt)}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Chip
            label={submission.status}
            size="small"
            sx={{ fontSize: "0.6rem", height: 18, fontWeight: 700, background: `${subStatusColor}15`, color: subStatusColor, border: `1px solid ${subStatusColor}30` }}
          />
          <Tooltip title="View PR">
            <IconButton
              component="a"
              href={/^https?:\/\//i.test(submission.prLink) ? submission.prLink : `https://${submission.prLink}`}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: "#06b6d4", p: 0.25 }}
            >
              <OpenInNewIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Typography
        component="a"
        href={/^https?:\/\//i.test(submission.prLink) ? submission.prLink : `https://${submission.prLink}`}
        target="_blank"
        rel="noopener noreferrer"
        variant="caption"
        sx={{ display: "block", color: "#06b6d4", fontFamily: "monospace", mb: 0.75, fontSize: "0.72rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
      >
        {submission.prLink.replace(/^https?:\/\//, "")}
      </Typography>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1.6, mb: 1.5 }}>
        {submission.description}
      </Typography>

      {/* Vote counts + buttons */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CheckCircleIcon sx={{ fontSize: 14, color: "#10b981" }} />
            <Typography variant="caption" fontWeight={700} sx={{ color: "#10b981" }}>
              {submission.approvalsCount}
            </Typography>
            {total > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                ({approvePct}%)
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CancelIcon sx={{ fontSize: 14, color: "#ef4444" }} />
            <Typography variant="caption" fontWeight={700} sx={{ color: "#ef4444" }}>
              {submission.rejectionsCount}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 0.75 }}>
          {canVote && submission.status === "pending" && (
            <>
              <Button
                size="small"
                variant={submission.userVote === "approve" ? "contained" : "outlined"}
                startIcon={<CheckCircleIcon sx={{ fontSize: 13 }} />}
                onClick={() => onVote(bountyId, submission.id, "approve")}
                sx={{
                  fontSize: "0.7rem", py: 0.25, px: 1.25,
                  borderColor: submission.userVote === "approve" ? "#10b981" : "rgba(16,185,129,0.4)",
                  color: submission.userVote === "approve" ? "#fff" : "#10b981",
                  bgcolor: submission.userVote === "approve" ? "#10b981" : "transparent",
                  "&:hover": { borderColor: "#10b981", bgcolor: "rgba(16,185,129,0.1)" },
                }}
              >
                Approve
              </Button>
              <Button
                size="small"
                variant={submission.userVote === "reject" ? "contained" : "outlined"}
                startIcon={<CancelIcon sx={{ fontSize: 13 }} />}
                onClick={() => onVote(bountyId, submission.id, "reject")}
                sx={{
                  fontSize: "0.7rem", py: 0.25, px: 1.25,
                  borderColor: submission.userVote === "reject" ? "#ef4444" : "rgba(239,68,68,0.4)",
                  color: submission.userVote === "reject" ? "#fff" : "#ef4444",
                  bgcolor: submission.userVote === "reject" ? "#ef4444" : "transparent",
                  "&:hover": { borderColor: "#ef4444", bgcolor: "rgba(239,68,68,0.1)" },
                }}
              >
                Reject
              </Button>
            </>
          )}

          {isIdeaAuthor && submission.status === "pending" && (
            <Button
              size="small"
              variant="contained"
              startIcon={<TaskAltIcon sx={{ fontSize: 13 }} />}
              onClick={() => onAccept(bountyId, submission.id)}
              sx={{
                fontSize: "0.7rem", py: 0.25, px: 1.5,
                background: "linear-gradient(135deg, #10b981, #059669)",
                "&:hover": { background: "linear-gradient(135deg, #34d399, #10b981)" },
              }}
            >
              Accept
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// ── Bounty Card ────────────────────────────────────────────────────────────
type SubFilter = "all" | "pending" | "accepted" | "rejected";

function BountyCard({
  bounty,
  currentUserId,
  ideaAuthorId,
  isAuthenticated,
  onVote,
  onAccept,
  onSubmitOpen,
}: {
  bounty: Bounty;
  currentUserId?: string;
  ideaAuthorId: string;
  isAuthenticated: boolean;
  onVote: (bountyId: string, subId: string, choice: "approve" | "reject") => void;
  onAccept: (bountyId: string, subId: string) => void;
  onSubmitOpen: (bountyId: string) => void;
}) {
  const [subFilter, setSubFilter] = useState<SubFilter>("all");
  const statusColor = STATUS_COLOR[bounty.status] ?? "#94a3b8";
  const isOpen = bounty.status === "open" || bounty.status === "submitted";
  const isIdeaAuthor = currentUserId === ideaAuthorId;
  const expired = new Date(bounty.deadline) < new Date();

  const filteredSubs = bounty.submissions.filter((s) => {
    if (subFilter === "all") return true;
    if (subFilter === "pending") return s.status === "pending";
    if (subFilter === "accepted") return s.status === "accepted";
    if (subFilter === "rejected") return s.status === "rejected";
    return true;
  });

  const pendingCount = bounty.submissions.filter((s) => s.status === "pending").length;
  const acceptedCount = bounty.submissions.filter((s) => s.status === "accepted").length;
  const rejectedCount = bounty.submissions.filter((s) => s.status === "rejected").length;

  return (
    <Paper sx={{
      p: 3, mb: 2,
      background: "rgba(13,22,40,0.6)",
      border: bounty.status === "completed"
        ? "1px solid rgba(16,185,129,0.3)"
        : "1px solid rgba(139,92,246,0.15)",
    }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5, gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>{bounty.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{bounty.description}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.75, flexShrink: 0 }}>
          <Chip
            label={bounty.status.toUpperCase()}
            size="small"
            sx={{ bgcolor: `${statusColor}20`, color: statusColor, border: `1px solid ${statusColor}50`, fontWeight: 700, fontSize: "0.65rem" }}
          />
          <Chip
            label={bounty.reward}
            size="small"
            icon={<EmojiEventsIcon sx={{ fontSize: "12px !important", color: "#f59e0b !important" }} />}
            sx={{ bgcolor: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)", fontWeight: 700, fontSize: "0.68rem" }}
          />
        </Box>
      </Box>

      {/* Meta row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Avatar src={bounty.author?.avatar} sx={{ width: 18, height: 18, fontSize: "0.55rem" }}>
            {bounty.author?.name?.[0]}
          </Avatar>
          <Typography variant="caption" color="text.secondary">{bounty.author?.name || "Anonymous"}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AccessTimeIcon sx={{ fontSize: 12, color: expired ? "#ef4444" : "#8b5cf6" }} />
          <Typography variant="caption" sx={{ color: expired ? "#ef4444" : "#8b5cf6", fontWeight: 600 }}>
            {deadlineLeft(bounty.deadline)}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {bounty.submissions.length} submission{bounty.submissions.length !== 1 ? "s" : ""}
        </Typography>
      </Box>

      {/* Submissions section */}
      {bounty.submissions.length > 0 && (
        <>
          <Divider sx={{ mb: 1.5, borderColor: "rgba(139,92,246,0.1)" }} />

          {/* Filter tabs */}
          <Tabs
            value={subFilter}
            onChange={(_, v) => setSubFilter(v)}
            sx={{
              mb: 1.5, minHeight: 32,
              "& .MuiTab-root": { minHeight: 32, py: 0.5, fontSize: "0.7rem", fontWeight: 600, textTransform: "none", minWidth: "auto", px: 1.5 },
              "& .MuiTabs-indicator": { backgroundColor: "#8b5cf6", height: 2 },
            }}
          >
            <Tab value="all" label={`All (${bounty.submissions.length})`} />
            {pendingCount > 0 && <Tab value="pending" label={`Pending (${pendingCount})`} />}
            {acceptedCount > 0 && <Tab value="accepted" label={`Accepted (${acceptedCount})`} />}
            {rejectedCount > 0 && <Tab value="rejected" label={`Rejected (${rejectedCount})`} />}
          </Tabs>

          {filteredSubs.map((sub) => (
            <SubmissionCard
              key={sub.id}
              submission={sub}
              bountyId={bounty.id}
              canVote={isAuthenticated && isOpen && !expired}
              isIdeaAuthor={isIdeaAuthor}
              onVote={onVote}
              onAccept={onAccept}
            />
          ))}

          {filteredSubs.length === 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", py: 2, textAlign: "center" }}>
              No {subFilter} submissions
            </Typography>
          )}
        </>
      )}

      {/* Submit code button */}
      {isOpen && !expired && isAuthenticated && (
        <Button
          size="small"
          variant="outlined"
          startIcon={<CodeIcon sx={{ fontSize: 14 }} />}
          onClick={() => onSubmitOpen(bounty.id)}
          sx={{
            mt: bounty.submissions.length > 0 ? 1.5 : 0,
            fontSize: "0.75rem", fontWeight: 600,
            borderColor: "rgba(139,92,246,0.35)",
            color: "#a78bfa",
            "&:hover": { borderColor: "#8b5cf6", bgcolor: "rgba(139,92,246,0.08)" },
          }}
        >
          Submit Code
        </Button>
      )}
    </Paper>
  );
}

// ── Leaderboard Panel ──────────────────────────────────────────────────────
function LeaderboardPanel() {
  const { data: leaders = [], isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["bounty-leaderboard"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/bounties/leaderboard`);
      if (!res.ok) return [];
      return res.json();
    },
  });

  const medalColors = ["#f59e0b", "#94a3b8", "#b45309"];

  return (
    <Paper sx={{
      p: 2.5,
      background: "rgba(13,22,40,0.6)",
      border: "1px solid rgba(245,158,11,0.2)",
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <LeaderboardIcon sx={{ color: "#f59e0b", fontSize: 18 }} />
        <Typography variant="subtitle2" fontWeight={700}>Bounty Leaderboard</Typography>
        <Chip label="Top Devs" size="small" sx={{ bgcolor: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)", fontSize: "0.62rem", height: 16 }} />
      </Box>

      {isLoading ? (
        <Typography variant="caption" color="text.secondary">Loading...</Typography>
      ) : leaders.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <WorkspacePremiumIcon sx={{ fontSize: 32, color: "rgba(245,158,11,0.2)", mb: 0.5 }} />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
            No winners yet. Be the first to earn bounty points!
          </Typography>
        </Box>
      ) : (
        <Stack spacing={1}>
          {leaders.map((entry, i) => (
            <Box key={entry.id} sx={{
              display: "flex", alignItems: "center", gap: 1.5, p: 1,
              borderRadius: 1.5,
              background: i === 0 ? "rgba(245,158,11,0.08)" : "transparent",
              border: i === 0 ? "1px solid rgba(245,158,11,0.2)" : "1px solid transparent",
            }}>
              <Typography
                variant="caption"
                fontWeight={800}
                sx={{ width: 20, textAlign: "center", color: i < 3 ? medalColors[i] : "text.secondary", fontSize: i === 0 ? "0.85rem" : "0.75rem" }}
              >
                {i < 3 ? ["🥇", "🥈", "🥉"][i] : `${i + 1}`}
              </Typography>
              <Avatar src={entry.avatar} sx={{ width: 28, height: 28, fontSize: "0.7rem" }}>
                {entry.name?.[0]}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="caption" fontWeight={700} sx={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {entry.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                  {entry.bountiesWon} bounti{entry.bountiesWon !== 1 ? "es" : "y"} won
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                <Typography variant="caption" fontWeight={800} sx={{ color: "#f59e0b", fontSize: "0.8rem" }}>
                  {entry.bountyPoints.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.6rem" }}>pts</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function FeatureBounties({ ideaId, authorId }: Props) {
  const { isAuthenticated, currentUser } = useAuth();
  const queryClient = useQueryClient();

  // Post Bounty dialog
  const [postOpen, setPostOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newReward, setNewReward] = useState("");
  const [newDeadlineDays, setNewDeadlineDays] = useState(14);
  const [postError, setPostError] = useState("");

  // Submit Code dialog
  const [submitBountyId, setSubmitBountyId] = useState<string | null>(null);
  const [prLink, setPrLink] = useState("");
  const [prDesc, setPrDesc] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Main tab: bounties | leaderboard
  const [mainTab, setMainTab] = useState<"bounties" | "leaderboard">("bounties");

  const { data: bounties = [], isLoading } = useQuery<Bounty[]>({
    queryKey: ["bounties", ideaId],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/bounties?ideaId=${ideaId}`, { headers: authHeaders() });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const postMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_BASE}/api/bounties`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ ideaId, title: newTitle, description: newDesc, reward: newReward, deadlineDays: newDeadlineDays }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to post bounty");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bounties", ideaId] });
      setPostOpen(false);
      setNewTitle(""); setNewDesc(""); setNewReward(""); setNewDeadlineDays(14); setPostError("");
    },
    onError: (e: Error) => setPostError(e.message),
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_BASE}/api/bounties/${submitBountyId}/submissions`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ prLink, description: prDesc }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bounties", ideaId] });
      setSubmitBountyId(null);
      setPrLink(""); setPrDesc(""); setSubmitError("");
    },
    onError: (e: Error) => setSubmitError(e.message),
  });

  const voteMutation = useMutation({
    mutationFn: async ({ bountyId, subId, choice }: { bountyId: string; subId: string; choice: "approve" | "reject" }) => {
      const res = await fetch(`${API_BASE}/api/bounties/${bountyId}/submissions/${subId}/vote`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ choice }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Vote failed");
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bounties", ideaId] }),
  });

  const acceptMutation = useMutation({
    mutationFn: async ({ bountyId, subId }: { bountyId: string; subId: string }) => {
      const res = await fetch(`${API_BASE}/api/bounties/${bountyId}/submissions/${subId}/accept`, {
        method: "POST",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Accept failed");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bounties", ideaId] });
      queryClient.invalidateQueries({ queryKey: ["bounty-leaderboard"] });
    },
  });

  const handleVote = (bountyId: string, subId: string, choice: "approve" | "reject") => {
    if (!isAuthenticated) return;
    voteMutation.mutate({ bountyId, subId, choice });
  };

  const handleAccept = (bountyId: string, subId: string) => {
    if (!isAuthenticated) return;
    acceptMutation.mutate({ bountyId, subId });
  };

  return (
    <Box sx={{ mt: 6 }}>
      {/* Section header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmojiEventsIcon sx={{ color: "#f59e0b" }} />
          <Typography variant="h6" fontWeight={700}>Feature Bounties</Typography>
          <Chip
            label={`${bounties.length} bounties`}
            size="small"
            sx={{ bgcolor: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)", fontSize: "0.7rem" }}
          />
        </Box>
        {isAuthenticated && mainTab === "bounties" && (
          <Button
            size="small" variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setPostOpen(true)}
            sx={{ borderColor: "rgba(245,158,11,0.4)", color: "#f59e0b", "&:hover": { borderColor: "#f59e0b", bgcolor: "rgba(245,158,11,0.08)" } }}
          >
            Post Bounty
          </Button>
        )}
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: "0.82rem", lineHeight: 1.6 }}>
        High-reputation developers bypass voting by submitting functional code for bounties — turning the DAO into an autonomous engineering workforce.
      </Typography>

      {/* Main tabs */}
      <Tabs
        value={mainTab}
        onChange={(_, v) => setMainTab(v)}
        sx={{
          mb: 3, borderBottom: "1px solid rgba(139,92,246,0.15)",
          "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: "0.85rem", minHeight: 40 },
          "& .MuiTabs-indicator": { backgroundColor: "#f59e0b" },
        }}
      >
        <Tab value="bounties" label="Bounties" icon={<EmojiEventsIcon sx={{ fontSize: 16 }} />} iconPosition="start" />
        <Tab value="leaderboard" label="Leaderboard" icon={<LeaderboardIcon sx={{ fontSize: 16 }} />} iconPosition="start" />
      </Tabs>

      {mainTab === "leaderboard" ? (
        <LeaderboardPanel />
      ) : (
        <>
          {!isAuthenticated && (
            <Alert severity="info" sx={{ mb: 3, bgcolor: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", color: "text.secondary" }}>
              Sign in to post bounties, submit code, and vote on submissions
            </Alert>
          )}

          {isLoading ? (
            <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>Loading bounties...</Typography>
          ) : bounties.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6, border: "1px dashed rgba(245,158,11,0.2)", borderRadius: 2 }}>
              <EmojiEventsIcon sx={{ fontSize: 40, color: "rgba(245,158,11,0.3)", mb: 1 }} />
              <Typography color="text.secondary">No bounties yet.</Typography>
              {isAuthenticated && (
                <Button size="small" onClick={() => setPostOpen(true)} sx={{ mt: 1.5, color: "#f59e0b" }}>
                  Post the first bounty
                </Button>
              )}
            </Box>
          ) : (
            bounties.map((b) => (
              <BountyCard
                key={b.id}
                bounty={b}
                currentUserId={currentUser?.id}
                ideaAuthorId={authorId}
                isAuthenticated={isAuthenticated}
                onVote={handleVote}
                onAccept={handleAccept}
                onSubmitOpen={(bid) => { setSubmitBountyId(bid); setPrLink(""); setPrDesc(""); setSubmitError(""); }}
              />
            ))
          )}
        </>
      )}

      {/* ── Post Bounty Dialog ─────────────────────────────────── */}
      <Dialog open={postOpen} onClose={() => setPostOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { background: "#0d1628", border: "1px solid rgba(245,158,11,0.3)" } }}>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: "1px solid rgba(245,158,11,0.15)", display: "flex", alignItems: "center", gap: 1 }}>
          <EmojiEventsIcon sx={{ color: "#f59e0b", fontSize: 20 }} />
          Post a Feature Bounty
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {postError && <Alert severity="error" sx={{ mb: 2 }}>{postError}</Alert>}
          <TextField fullWidth label="Feature Title" value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Build staking rewards dashboard"
            sx={{ mb: 2 }} size="small" />
          <TextField fullWidth label="Description" value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Describe what needs to be built, acceptance criteria, tech stack preferences..."
            multiline rows={4} sx={{ mb: 2 }} size="small" />
          <TextField fullWidth label="Reward" value={newReward}
            onChange={(e) => setNewReward(e.target.value)}
            placeholder="e.g. 500 USDC, 1,000 IDEA tokens"
            sx={{ mb: 2 }} size="small" />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>Deadline:</Typography>
            {[7, 14, 30].map((d) => (
              <Chip key={d} label={`${d} days`} size="small" clickable
                onClick={() => setNewDeadlineDays(d)}
                sx={{
                  bgcolor: newDeadlineDays === d ? "rgba(245,158,11,0.2)" : "transparent",
                  border: newDeadlineDays === d ? "1px solid #f59e0b" : "1px solid rgba(245,158,11,0.25)",
                  color: newDeadlineDays === d ? "#f59e0b" : "text.secondary",
                }} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, borderTop: "1px solid rgba(245,158,11,0.15)" }}>
          <Button onClick={() => setPostOpen(false)} sx={{ color: "text.secondary" }}>Cancel</Button>
          <Button variant="contained" onClick={() => postMutation.mutate()}
            disabled={!newTitle.trim() || !newDesc.trim() || !newReward.trim() || postMutation.isPending}
            sx={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", "&:hover": { background: "linear-gradient(135deg, #fbbf24, #f59e0b)" } }}>
            {postMutation.isPending ? "Posting..." : "Post Bounty"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Submit Code Dialog ─────────────────────────────────── */}
      <Dialog open={!!submitBountyId} onClose={() => setSubmitBountyId(null)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { background: "#0d1628", border: "1px solid rgba(139,92,246,0.3)" } }}>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: "1px solid rgba(139,92,246,0.15)", display: "flex", alignItems: "center", gap: 1 }}>
          <CodeIcon sx={{ color: "#8b5cf6", fontSize: 20 }} />
          Submit Code
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
          <Stack spacing={2}>
            <TextField fullWidth label="GitHub PR / Repository Link" value={prLink}
              onChange={(e) => setPrLink(e.target.value)}
              placeholder="https://github.com/org/repo/pull/123"
              size="small"
              error={!!prLink && !/^https?:\/\//i.test(prLink)}
              helperText={!!prLink && !/^https?:\/\//i.test(prLink) ? "Must be a valid URL starting with https://" : ""} />
            <TextField fullWidth label="Description" value={prDesc}
              onChange={(e) => setPrDesc(e.target.value)}
              placeholder="Summarize what you built, how it works, and how to test it..."
              multiline rows={4} size="small" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, borderTop: "1px solid rgba(139,92,246,0.15)" }}>
          <Button onClick={() => setSubmitBountyId(null)} sx={{ color: "text.secondary" }}>Cancel</Button>
          <Button variant="contained" onClick={() => submitMutation.mutate()}
            disabled={!prLink.trim() || !/^https?:\/\//i.test(prLink) || !prDesc.trim() || submitMutation.isPending}
            sx={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", "&:hover": { background: "linear-gradient(135deg, #a78bfa, #7c3aed)" } }}>
            {submitMutation.isPending ? "Submitting..." : "Submit Code"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
