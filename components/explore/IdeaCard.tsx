"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
  Chip,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Idea } from "@/types";
import { formatRelativeDate, truncate } from "@/lib/utils";

interface IdeaCardProps {
  idea: Idea;
  onVote?: (id: string) => void;
}

const TAG_COLORS: Record<string, string> = {
  DeFi: "#06b6d4",
  NFT: "#ec4899",
  DAO: "#8b5cf6",
  EdTech: "#10b981",
  GameFi: "#f59e0b",
  SocialFi: "#06b6d4",
  RWA: "#10b981",
  Polygon: "#8b5cf6",
  Ethereum: "#6366f1",
  Arbitrum: "#06b6d4",
  Base: "#3b82f6",
  Solana: "#a855f7",
};

function getTagColor(tag: string) {
  return TAG_COLORS[tag] || "#8b5cf6";
}

export default function IdeaCard({ idea, onVote }: IdeaCardProps) {
  const score = idea.blueprint?.readinessScore?.overall;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s",
        "&:hover": {
          border: "1px solid rgba(139,92,246,0.5)",
          transform: "translateY(-3px)",
          boxShadow: "0 8px 40px rgba(139,92,246,0.18)",
        },
      }}
    >
      <CardActionArea component={Link} href={`/idea/${idea.id}`} sx={{ flex: 1 }}>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                src={idea.user?.avatar}
                alt={idea.user?.name}
                sx={{ width: 28, height: 28, fontSize: "0.75rem" }}
              >
                {idea.user?.name?.[0]}
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                {idea.user?.name || "Anonymous"}
              </Typography>
            </Box>
            {score !== undefined && (
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  background: score >= 8 ? "rgba(16,185,129,0.15)" : score >= 6 ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                  border: `1px solid ${score >= 8 ? "rgba(16,185,129,0.4)" : score >= 6 ? "rgba(245,158,11,0.4)" : "rgba(239,68,68,0.4)"}`,
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{ color: score >= 8 ? "#10b981" : score >= 6 ? "#f59e0b" : "#ef4444" }}
                >
                  {score.toFixed(1)} / 10
                </Typography>
              </Box>
            )}
          </Box>

          {/* Title */}
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5, lineHeight: 1.4 }}>
            {truncate(idea.title, 80)}
          </Typography>

          {/* Raw idea preview */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
            {truncate(idea.rawIdea, 120)}
          </Typography>

          {/* Blueprint preview chips */}
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 2 }}>
            {idea.blueprint?.recommendedBlockchain?.primary && (
              <Chip
                size="small"
                label={`⛓ ${idea.blueprint.recommendedBlockchain.primary}`}
                sx={{ fontSize: "0.7rem", background: "rgba(6,182,212,0.1)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" }}
              />
            )}
            {idea.blueprint?.tokenModel?.symbol && (
              <Chip
                size="small"
                label={`$${idea.blueprint.tokenModel.symbol}`}
                sx={{ fontSize: "0.7rem", background: "rgba(139,92,246,0.1)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.2)" }}
              />
            )}
          </Box>

          {/* Tags */}
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {idea.tags?.slice(0, 4).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  fontSize: "0.65rem",
                  height: 22,
                  background: `${getTagColor(tag)}15`,
                  color: getTagColor(tag),
                  border: `1px solid ${getTagColor(tag)}30`,
                }}
              />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>

      {/* Footer */}
      <Box
        sx={{
          px: 2,
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(139,92,246,0.1)",
          mt: "auto",
        }}
      >
        <Stack direction="row" spacing={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={(e) => { e.preventDefault(); onVote?.(idea.id); }}
              sx={{ color: idea.userHasVoted ? "#8b5cf6" : "text.secondary", p: 0.5 }}
            >
              {idea.userHasVoted ? <ThumbUpAltIcon fontSize="small" /> : <ThumbUpAltOutlinedIcon fontSize="small" />}
            </IconButton>
            <Typography variant="caption" color="text.secondary">{idea.voteCount}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">{idea.commentCount}</Typography>
          </Box>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {formatRelativeDate(idea.createdAt)}
        </Typography>
      </Box>
    </Card>
  );
}
