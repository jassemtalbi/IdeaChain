"use client";

import { useEffect } from "react";
import {
  Container, Box, Typography, Grid, Card, CardContent,
  Avatar, Button, Chip, Skeleton, LinearProgress,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Idea } from "@/types";
import { API_BASE, authHeaders } from "@/lib/fetchWithAuth";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import BoltIcon from "@mui/icons-material/Bolt";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { formatRelativeDate } from "@/lib/utils";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, currentUser } = useAuth();
  const { data: myIdeas = [], isLoading } = useQuery<Idea[]>({
    queryKey: ["my-ideas"],
    queryFn: async () => {
      const res = await fetch(API_BASE + "/api/ideas/user/me", { headers: authHeaders() });
      if (!res.ok) return [];
      return res.json();
    },
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Skeleton variant="rounded" height={200} sx={{ bgcolor: "rgba(139,92,246,0.07)", borderRadius: 3 }} />
      </Container>
    );
  }

  const totalVotes = myIdeas.reduce((sum, idea) => sum + (idea.voteCount || 0), 0);
  const topIdea = [...myIdeas].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))[0];
  const avgScore = myIdeas.length
    ? (myIdeas.reduce((sum, idea) => sum + (idea.blueprint?.readinessScore?.overall || 0), 0) / myIdeas.length).toFixed(1)
    : "—";

  const STATS = [
    {
      icon: <LightbulbIcon />,
      value: myIdeas.length,
      label: "Ideas Transformed",
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.1)",
    },
    {
      icon: <ThumbUpAltIcon />,
      value: totalVotes,
      label: "Total Votes Received",
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.1)",
    },
    {
      icon: <TrendingUpIcon />,
      value: avgScore,
      label: "Avg Readiness Score",
      color: "#10b981",
      bg: "rgba(16,185,129,0.1)",
    },
  ];

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse 60% 35% at 80% 0%, rgba(139,92,246,0.07) 0%, transparent 55%)",
    }}>
      {/* Profile header */}
      <Box sx={{
        borderBottom: "1px solid rgba(139,92,246,0.1)",
        background: "rgba(5,10,20,0.5)",
        backdropFilter: "blur(12px)",
        py: 5,
      }}>
        <Container maxWidth="lg">
          <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ display: "flex", gap: 2.5, alignItems: "center" }}>
                <Avatar
                  src={currentUser?.avatar}
                  sx={{
                    width: 60, height: 60,
                    border: "2.5px solid rgba(139,92,246,0.5)",
                    boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                    fontSize: "1.3rem", fontWeight: 700,
                  }}
                >
                  {currentUser?.name?.[0]?.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: "-0.01em" }}>
                    {currentUser?.name || "Builder"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentUser?.email || (currentUser?.walletAddress ? currentUser.walletAddress.slice(0, 20) + "…" : "")}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<BoltIcon />}
                onClick={() => router.push("/transform")}
                sx={{
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  boxShadow: "0 0 20px rgba(139,92,246,0.35)",
                  fontWeight: 700, borderRadius: 2,
                  "&:hover": { boxShadow: "0 0 32px rgba(139,92,246,0.55)", transform: "translateY(-1px)" },
                }}
              >
                New Blueprint
              </Button>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {STATS.map((stat, i) => (
            <Grid item xs={12} sm={4} key={stat.label}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card>
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2.5, py: 2.5 }}>
                    <Box sx={{
                      width: 48, height: 48, borderRadius: 2,
                      background: stat.bg, border: `1px solid ${stat.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: stat.color, flexShrink: 0,
                    }}>
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight={800} sx={{ color: stat.color, lineHeight: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </MotionBox>
            </Grid>
          ))}
        </Grid>

        {/* Top idea highlight */}
        {topIdea && topIdea.voteCount > 0 && (
          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} sx={{ mb: 4 }}>
            <Card sx={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(139,92,246,0.06) 100%)",
              border: "1px solid rgba(245,158,11,0.25)",
            }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
                <EmojiEventsIcon sx={{ color: "#f59e0b", fontSize: 28, flexShrink: 0 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" sx={{ color: "#f59e0b", fontWeight: 700, letterSpacing: "0.06em", fontSize: "0.68rem" }}>
                    TOP PERFORMING BLUEPRINT
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={700} noWrap sx={{ mt: 0.25 }}>
                    {topIdea.title}
                  </Typography>
                </Box>
                <Chip
                  label={`${topIdea.voteCount} votes`}
                  size="small"
                  sx={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)", fontWeight: 700 }}
                />
                <Button
                  component={Link}
                  href={`/idea/${topIdea.id}`}
                  size="small"
                  endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                  sx={{ color: "#f59e0b", flexShrink: 0, fontWeight: 600 }}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          </MotionBox>
        )}

        {/* Ideas list */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
            <Typography variant="h6" fontWeight={700}>My Blueprints</Typography>
            {myIdeas.length > 0 && (
              <Typography variant="caption" color="text.secondary">{myIdeas.length} blueprint{myIdeas.length !== 1 ? "s" : ""}</Typography>
            )}
          </Box>

          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={90} sx={{ mb: 2, bgcolor: "rgba(139,92,246,0.06)", borderRadius: 2 }} />
            ))
          ) : myIdeas.length === 0 ? (
            <MotionBox initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: "center", py: 10 }}>
              <Box sx={{
                width: 72, height: 72, borderRadius: "50%", mx: "auto", mb: 3,
                background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <LightbulbIcon sx={{ fontSize: 32, color: "#8b5cf6" }} />
              </Box>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>No blueprints yet</Typography>
              <Typography color="text.secondary" sx={{ mb: 4, fontSize: "0.9rem" }}>
                Transform your first Web2 idea into a Web3 blueprint.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<BoltIcon />}
                onClick={() => router.push("/transform")}
                sx={{
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  boxShadow: "0 0 24px rgba(139,92,246,0.4)",
                  fontWeight: 700, borderRadius: 2, px: 4, py: 1.5,
                }}
              >
                Transform Your First Idea
              </Button>
            </MotionBox>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {myIdeas.map((idea, i) => {
                const score = idea.blueprint?.readinessScore?.overall;
                const scoreColor = score !== undefined ? (score >= 8 ? "#10b981" : score >= 6 ? "#f59e0b" : "#ef4444") : "#8b5cf6";
                return (
                  <MotionCard
                    key={idea.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ x: 4 }}
                    sx={{ transition: "border-color 0.2s, box-shadow 0.2s", "&:hover": { borderColor: "rgba(139,92,246,0.4)", boxShadow: "0 4px 20px rgba(139,92,246,0.12)" } }}
                  >
                    <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle1" fontWeight={700} noWrap sx={{ mb: 0.75, fontSize: "0.95rem" }}>
                            {idea.title}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                              {formatRelativeDate(idea.createdAt)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">·</Typography>
                            <Typography variant="caption" sx={{ color: "#8b5cf6", fontWeight: 600, fontSize: "0.72rem" }}>
                              {idea.voteCount || 0} votes
                            </Typography>
                            {idea.blueprint?.tokenModel?.symbol && (
                              <Chip
                                label={`$${idea.blueprint.tokenModel.symbol}`}
                                size="small"
                                sx={{ fontSize: "0.63rem", height: 18, background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}
                              />
                            )}
                          </Box>
                          {score !== undefined && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={score * 10}
                                sx={{
                                  width: 80, height: 3, borderRadius: 2,
                                  backgroundColor: "rgba(139,92,246,0.1)",
                                  "& .MuiLinearProgress-bar": { background: scoreColor, borderRadius: 2 },
                                }}
                              />
                              <Typography variant="caption" sx={{ color: scoreColor, fontWeight: 700, fontSize: "0.68rem" }}>
                                {score.toFixed(1)}/10
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        <Button
                          component={Link}
                          href={`/idea/${idea.id}`}
                          size="small"
                          endIcon={<OpenInNewIcon sx={{ fontSize: 13 }} />}
                          sx={{ color: "#8b5cf6", flexShrink: 0, fontWeight: 600, "&:hover": { background: "rgba(139,92,246,0.08)" } }}
                        >
                          View
                        </Button>
                      </Box>
                    </CardContent>
                  </MotionCard>
                );
              })}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
