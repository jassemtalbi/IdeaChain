"use client";

import {
  Box, Container, Typography, Avatar, Chip, Paper, Skeleton, Stack,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useQuery } from "@tanstack/react-query";
import { LeaderboardEntry } from "@/types";
import { API_BASE } from "@/lib/fetchWithAuth";

const MEDAL = ["🥇", "🥈", "🥉"];
const RANK_GLOW = [
  "0 0 24px rgba(245,158,11,0.35)",
  "0 0 16px rgba(148,163,184,0.2)",
  "0 0 16px rgba(180,83,9,0.2)",
];
const RANK_BORDER = [
  "1px solid rgba(245,158,11,0.45)",
  "1px solid rgba(148,163,184,0.25)",
  "1px solid rgba(180,83,9,0.25)",
];

export default function LeaderboardPage() {
  const { data: leaders = [], isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["bounty-leaderboard"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/bounties/leaderboard`);
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box sx={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 64, height: 64, borderRadius: "18px", mb: 2,
            background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))",
            border: "1px solid rgba(245,158,11,0.3)",
            boxShadow: "0 0 32px rgba(245,158,11,0.2)",
          }}>
            <LeaderboardIcon sx={{ fontSize: 32, color: "#f59e0b" }} />
          </Box>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1, letterSpacing: "-0.02em" }}>
            Bounty{" "}
            <Box component="span" sx={{
              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Leaderboard
            </Box>
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 420, mx: "auto" }}>
            Top developers ranked by bounty points earned across all ideas.
            Win bounties to climb the ranks.
          </Typography>
        </Box>

        {/* Top 3 podium */}
        {!isLoading && leaders.length >= 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 2, mb: 4 }}>
            {/* Reorder: 2nd, 1st, 3rd */}
            {[1, 0, 2].map((rank) => {
              const entry = leaders[rank];
              if (!entry) return <Box key={rank} sx={{ flex: 1 }} />;
              const isFirst = rank === 0;
              return (
                <Box
                  key={entry.id}
                  sx={{
                    flex: 1, maxWidth: isFirst ? 200 : 160,
                    display: "flex", flexDirection: "column", alignItems: "center",
                    pb: isFirst ? 0 : rank === 1 ? 2 : 3,
                  }}
                >
                  <Typography sx={{ fontSize: isFirst ? "2.5rem" : "1.8rem", mb: 1 }}>
                    {MEDAL[rank]}
                  </Typography>
                  <Avatar
                    src={entry.avatar}
                    sx={{
                      width: isFirst ? 72 : 56,
                      height: isFirst ? 72 : 56,
                      fontSize: isFirst ? "1.5rem" : "1.1rem",
                      border: RANK_BORDER[rank],
                      boxShadow: RANK_GLOW[rank],
                      mb: 1,
                    }}
                  >
                    {entry.name?.[0]}
                  </Avatar>
                  <Typography variant={isFirst ? "subtitle1" : "body2"} fontWeight={700} sx={{ textAlign: "center" }}>
                    {entry.name}
                  </Typography>
                  <Chip
                    label={`${entry.bountyPoints.toLocaleString()} pts`}
                    size="small"
                    icon={<EmojiEventsIcon sx={{ fontSize: "12px !important", color: "#f59e0b !important" }} />}
                    sx={{
                      mt: 0.5,
                      bgcolor: "rgba(245,158,11,0.12)", color: "#f59e0b",
                      border: "1px solid rgba(245,158,11,0.3)",
                      fontWeight: 700, fontSize: "0.7rem",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    {entry.bountiesWon} {entry.bountiesWon === 1 ? "bounty" : "bounties"} won
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}

        {/* Full ranked list */}
        <Paper sx={{
          background: "rgba(13,22,40,0.7)",
          border: "1px solid rgba(139,92,246,0.12)",
          overflow: "hidden",
        }}>
          {/* Table header */}
          <Box sx={{
            display: "grid",
            gridTemplateColumns: "48px 1fr 120px 100px",
            px: 2.5, py: 1.25,
            borderBottom: "1px solid rgba(139,92,246,0.1)",
            background: "rgba(139,92,246,0.05)",
          }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ letterSpacing: "0.06em" }}>RANK</Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ letterSpacing: "0.06em" }}>DEVELOPER</Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ letterSpacing: "0.06em", textAlign: "center" }}>BOUNTIES WON</Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ letterSpacing: "0.06em", textAlign: "right" }}>POINTS</Typography>
          </Box>

          {isLoading ? (
            <Stack>
              {Array.from({ length: 8 }).map((_, i) => (
                <Box key={i} sx={{ px: 2.5, py: 1.5, borderBottom: "1px solid rgba(139,92,246,0.06)" }}>
                  <Skeleton variant="rounded" height={40} sx={{ bgcolor: "rgba(139,92,246,0.06)" }} />
                </Box>
              ))}
            </Stack>
          ) : leaders.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <WorkspacePremiumIcon sx={{ fontSize: 48, color: "rgba(245,158,11,0.2)", mb: 1.5 }} />
              <Typography variant="h6" color="text.secondary" fontWeight={600} sx={{ mb: 0.5 }}>
                No winners yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accept a bounty submission to award the first points.
              </Typography>
            </Box>
          ) : (
            leaders.map((entry, i) => {
              const isTop3 = i < 3;
              const rowBg = i === 0
                ? "rgba(245,158,11,0.06)"
                : i === 1
                ? "rgba(148,163,184,0.04)"
                : i === 2
                ? "rgba(180,83,9,0.04)"
                : "transparent";

              return (
                <Box
                  key={entry.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr 120px 100px",
                    alignItems: "center",
                    px: 2.5, py: 1.5,
                    background: rowBg,
                    borderBottom: "1px solid rgba(139,92,246,0.06)",
                    "&:last-child": { borderBottom: "none" },
                    "&:hover": { background: "rgba(139,92,246,0.05)" },
                    transition: "background 0.15s",
                  }}
                >
                  {/* Rank */}
                  <Typography
                    fontWeight={800}
                    sx={{
                      fontSize: isTop3 ? "1.1rem" : "0.85rem",
                      color: isTop3 ? ["#f59e0b", "#94a3b8", "#b45309"][i] : "text.secondary",
                    }}
                  >
                    {isTop3 ? MEDAL[i] : i + 1}
                  </Typography>

                  {/* Developer */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      src={entry.avatar}
                      sx={{
                        width: 36, height: 36, fontSize: "0.85rem",
                        border: isTop3 ? RANK_BORDER[i] : "1px solid rgba(139,92,246,0.15)",
                      }}
                    >
                      {entry.name?.[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={700}>{entry.name}</Typography>
                      {i === 0 && (
                        <Chip label="Top Dev" size="small" sx={{ height: 16, fontSize: "0.6rem", bgcolor: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }} />
                      )}
                    </Box>
                  </Box>

                  {/* Bounties won */}
                  <Typography variant="body2" fontWeight={600} sx={{ textAlign: "center", color: "#10b981" }}>
                    {entry.bountiesWon}
                  </Typography>

                  {/* Points */}
                  <Typography
                    variant="body2"
                    fontWeight={800}
                    sx={{
                      textAlign: "right",
                      color: isTop3 ? ["#f59e0b", "#94a3b8", "#cd7c2f"][i] : "text.primary",
                      fontSize: isTop3 ? "0.95rem" : "0.875rem",
                    }}
                  >
                    {entry.bountyPoints.toLocaleString()}
                    <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>pts</Typography>
                  </Typography>
                </Box>
              );
            })
          )}
        </Paper>

      </Container>
    </Box>
  );
}
