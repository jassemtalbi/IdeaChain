"use client";

import { useState } from "react";
import {
  Container, Box, Typography, Avatar, Chip, Button, IconButton,
  TextField, Stack, Divider, Skeleton, Alert, Paper,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BlueprintDisplay from "@/components/transform/BlueprintDisplay";
import DAOVoting from "@/components/dao/DAOVoting";
import { useAuth } from "@/hooks/useAuth";
import { Idea, Comment } from "@/types";
import { formatRelativeDate } from "@/lib/utils";
import { API_BASE, authHeaders } from "@/lib/fetchWithAuth";

function useIdeaDetail(id: string) {
  return useQuery<Idea>({
    queryKey: ["idea", id],
    queryFn: async () => {
      const res = await fetch(API_BASE + "/api/ideas/" + id, { headers: authHeaders() });
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });
}

function useComments(ideaId: string) {
  return useQuery<Comment[]>({
    queryKey: ["comments", ideaId],
    queryFn: async () => {
      const res = await fetch(API_BASE + "/api/comments?ideaId=" + ideaId, { headers: authHeaders() });
      if (!res.ok) return [];
      return res.json();
    },
  });
}

export default function IdeaDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isAuthenticated, currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [voted, setVoted] = useState(false);

  const { data: idea, isLoading, error } = useIdeaDetail(params.id);
  const { data: comments, isLoading: commentsLoading } = useComments(params.id);

  const voteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(API_BASE + "/api/votes", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ ideaId: params.id }),
      });
      return res.json();
    },
    onSuccess: (data) => setVoted(data.voted),
  });

  const commentMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch(API_BASE + "/api/comments", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ ideaId: params.id, content }),
      });
      return res.json();
    },
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["comments", params.id] });
    },
  });

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Skeleton variant="rounded" height={60} sx={{ mb: 3, bgcolor: "rgba(139,92,246,0.08)" }} />
        <Skeleton variant="rounded" height={400} sx={{ bgcolor: "rgba(139,92,246,0.08)" }} />
      </Container>
    );
  }

  if (error || !idea) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Alert severity="error">Idea not found</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="xl">
        {/* Back + header */}
        <Box sx={{ mb: 4 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ color: "text.secondary", mb: 3, "&:hover": { color: "#8b5cf6" } }}>
            Back
          </Button>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <Avatar src={idea.user?.avatar} sx={{ width: 36, height: 36 }}>
                  {idea.user?.name?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>{idea.user?.name || "Anonymous"}</Typography>
                  <Typography variant="caption" color="text.secondary">{formatRelativeDate(idea.createdAt)}</Typography>
                </Box>
              </Box>
              <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>{idea.title}</Typography>
              <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                {idea.tags?.map((tag) => (
                  <Chip key={tag} label={tag} size="small"
                    sx={{ background: "rgba(139,92,246,0.12)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)", fontSize: "0.72rem" }} />
                ))}
              </Box>
            </Box>

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={voted ? <ThumbUpAltIcon sx={{ color: "#8b5cf6" }} /> : <ThumbUpAltOutlinedIcon />}
                onClick={() => voteMutation.mutate()}
                sx={{
                  borderColor: voted ? "#8b5cf6" : "rgba(139,92,246,0.3)",
                  color: voted ? "#8b5cf6" : "text.secondary",
                  "&:hover": { borderColor: "#8b5cf6", background: "rgba(139,92,246,0.08)" },
                }}
              >
                {(idea.voteCount || 0) + (voted ? 1 : 0)}
              </Button>
              <IconButton
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                sx={{ border: "1px solid rgba(139,92,246,0.3)", color: "text.secondary", borderRadius: 2, "&:hover": { color: "#8b5cf6" } }}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        {/* Blueprint */}
        <BlueprintDisplay blueprint={idea.blueprint} rawIdea={idea.rawIdea} />

        {/* Comments */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
            Community Discussion ({comments?.length || 0})
          </Typography>

          {/* Comment input */}
          {isAuthenticated ? (
            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Avatar src={currentUser?.avatar} sx={{ width: 36, height: 36, flexShrink: 0, mt: 0.5 }}>
                {currentUser?.name?.[0]}
              </Avatar>
              <Box sx={{ flex: 1, display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Share your thoughts on this blueprint..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && comment.trim() && commentMutation.mutate(comment)}
                  multiline
                  maxRows={4}
                />
                <IconButton
                  onClick={() => comment.trim() && commentMutation.mutate(comment)}
                  disabled={!comment.trim() || commentMutation.isPending}
                  sx={{ color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.4)", borderRadius: 2, alignSelf: "flex-start" }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Alert severity="info" sx={{ mb: 3, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "text.secondary" }}>
              Sign in to join the discussion
            </Alert>
          )}

          <Divider sx={{ mb: 3 }} />

          {commentsLoading ? (

            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={70} sx={{ mb: 2, bgcolor: "rgba(139,92,246,0.06)" }} />
            ))
          ) : comments && comments.length > 0 ? (
            <Stack spacing={2}>
              {comments.map((c) => (
                <Paper key={c.id} sx={{ p: 2.5, background: "rgba(13,22,40,0.5)", border: "1px solid rgba(139,92,246,0.1)" }}>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Avatar src={c.user?.avatar} sx={{ width: 30, height: 30, fontSize: "0.75rem" }}>
                      {c.user?.name?.[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", gap: 1, mb: 0.75, alignItems: "center" }}>
                        <Typography variant="caption" fontWeight={700}>{c.user?.name || "Anonymous"}</Typography>
                        <Typography variant="caption" color="text.secondary">·</Typography>
                        <Typography variant="caption" color="text.secondary">{formatRelativeDate(c.createdAt)}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {c.content}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography color="text.secondary">No comments yet. Be the first to share your thoughts.</Typography>
            </Box>
          )}
        </Box>

        {/* DAO Governance */}
        <DAOVoting ideaId={params.id} />
      </Container>
    </Box>
  );
}
