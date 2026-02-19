"use client";

import { useEffect } from "react";
import {
  Container, Box, Typography, Grid, Card, CardContent,
  Avatar, Button, Chip, Skeleton, Stack, Alert,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useIdeas } from "@/hooks/useIdeas";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { formatRelativeDate } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, currentUser } = useAuth();
  const { data: allIdeas, isLoading } = useIdeas("recent");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Skeleton variant="rounded" height={200} sx={{ bgcolor: "rgba(139,92,246,0.08)" }} />
      </Container>
    );
  }

  // Filter ideas by current user
  const myIdeas = allIdeas?.filter((idea) => idea.userId === currentUser?.id) || [];
  const totalVotes = myIdeas.reduce((sum, idea) => sum + (idea.voteCount || 0), 0);
  const topIdea = myIdeas.sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))[0];

  return (
    <Box sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        {/* User header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6, flexWrap: "wrap", gap: 3 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar
              src={currentUser?.avatar}
              sx={{ width: 64, height: 64, border: "2px solid rgba(139,92,246,0.5)" }}
            >
              {currentUser?.name?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>{currentUser?.name || "Builder"}</Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUser?.email || currentUser?.walletAddress?.slice(0, 20) + "..."}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/transform")}
            sx={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}
          >
            New Blueprint
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {[
            { icon: <LightbulbIcon sx={{ color: "#8b5cf6" }} />, value: myIdeas.length, label: "Ideas Transformed", color: "#8b5cf6" },
            { icon: <ThumbUpAltIcon sx={{ color: "#06b6d4" }} />, value: totalVotes, label: "Total Votes Received", color: "#06b6d4" },
          ].map((stat) => (
            <Grid item xs={12} sm={6} key={stat.label}>
              <Card>
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {stat.icon}
                  <Box>
                    <Typography variant="h3" fontWeight={800} sx={{ color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Ideas list */}
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
            My Blueprints
          </Typography>

          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={100} sx={{ mb: 2, bgcolor: "rgba(139,92,246,0.06)" }} />
            ))
          ) : myIdeas.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <LightbulbIcon sx={{ fontSize: 48, color: "rgba(139,92,246,0.3)", mb: 2 }} />
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                You haven't transformed any ideas yet.
              </Typography>
              <Button variant="contained" onClick={() => router.push("/transform")}
                sx={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
                Transform Your First Idea
              </Button>
            </Box>
          ) : (
            <Stack spacing={2}>
              {myIdeas.map((idea) => (
                <Card key={idea.id} sx={{ "&:hover": { border: "1px solid rgba(139,92,246,0.4)", transform: "translateX(4px)" }, transition: "all 0.2s" }}>
                  <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ flex: 1, mr: 2 }}>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                        {idea.title}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                        <Typography variant="caption" color="text.secondary">
                          {formatRelativeDate(idea.createdAt)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">·</Typography>
                        <Typography variant="caption" sx={{ color: "#8b5cf6" }}>
                          {idea.voteCount || 0} votes
                        </Typography>
                        {idea.blueprint?.tokenModel?.symbol && (
                          <Chip label={`$${idea.blueprint.tokenModel.symbol}`} size="small"
                            sx={{ fontSize: "0.65rem", height: 20, background: "rgba(139,92,246,0.1)", color: "#8b5cf6" }} />
                        )}
                      </Box>
                    </Box>
                    <Button
                      component={Link}
                      href={`/idea/${idea.id}`}
                      size="small"
                      endIcon={<OpenInNewIcon fontSize="small" />}
                      sx={{ color: "#8b5cf6", flexShrink: 0 }}
                    >
                      View
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </Container>
    </Box>
  );
}
