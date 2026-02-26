"use client";

import Link from "next/link";
import {
  Box, Typography, Chip, Avatar, IconButton, LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Idea } from "@/types";
import { formatRelativeDate, truncate } from "@/lib/utils";

const MotionBox = motion(Box);

interface IdeaCardProps {
  idea: Idea;
  onVote?: (id: string) => void;
}

const TAG_COLORS: Record<string, string> = {
  DeFi: "#06b6d4", NFT: "#ec4899", DAO: "#8b5cf6",
  EdTech: "#10b981", GameFi: "#f59e0b", SocialFi: "#06b6d4",
  RWA: "#10b981", Polygon: "#8b5cf6", Ethereum: "#6366f1",
  Arbitrum: "#06b6d4", Base: "#3b82f6", Solana: "#a855f7",
};

function getTagColor(tag: string) { return TAG_COLORS[tag] || "#8b5cf6"; }

function getScoreColor(score: number) {
  if (score >= 8) return "#10b981";
  if (score >= 6) return "#f59e0b";
  return "#ef4444";
}

export default function IdeaCard({ idea, onVote }: IdeaCardProps) {
  const score = idea.blueprint?.readinessScore?.overall;
  const chain = idea.blueprint?.recommendedBlockchain?.primary;
  const tokenSymbol = idea.blueprint?.tokenModel?.symbol;

  return (
    <MotionBox
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        background: "rgba(13,22,40,0.75)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(139,92,246,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.25s, box-shadow 0.25s",
        "&:hover": {
          borderColor: "rgba(139,92,246,0.45)",
          boxShadow: "0 8px 40px rgba(139,92,246,0.18)",
        },
      }}
    >
      {/* Gradient top accent */}
      {score !== undefined && (
        <Box sx={{
          height: 3,
          background: `linear-gradient(90deg, ${getScoreColor(score)}, ${getScoreColor(score)}55)`,
        }} />
      )}

      {/* Clickable area */}
      <Link href={`/idea/${idea.id}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>

          {/* Header row */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                src={idea.user?.avatar}
                sx={{ width: 26, height: 26, fontSize: "0.7rem", border: "1.5px solid rgba(139,92,246,0.3)" }}
              >
                {idea.user?.name?.[0]}
              </Avatar>
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                {idea.user?.name || "Anonymous"}
              </Typography>
            </Box>

            {score !== undefined && (
              <Box sx={{
                px: 1.25, py: 0.35, borderRadius: 1.5,
                background: `${getScoreColor(score)}18`,
                border: `1px solid ${getScoreColor(score)}45`,
                display: "flex", alignItems: "center", gap: 0.5,
              }}>
                <Typography variant="caption" fontWeight={800} sx={{ color: getScoreColor(score), fontSize: "0.72rem" }}>
                  {score.toFixed(1)}
                </Typography>
                <Typography variant="caption" sx={{ color: `${getScoreColor(score)}99`, fontSize: "0.65rem" }}>
                  /10
                </Typography>
              </Box>
            )}
          </Box>

          {/* Title */}
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, lineHeight: 1.4, color: "text.primary", fontSize: "0.95rem" }}>
            {truncate(idea.title, 75)}
          </Typography>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.65, fontSize: "0.82rem", flex: 1 }}>
            {truncate(idea.rawIdea, 110)}
          </Typography>

          {/* Readiness bar */}
          {score !== undefined && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: "rgba(148,163,184,0.7)", fontSize: "0.65rem", letterSpacing: "0.04em" }}>
                  READINESS
                </Typography>
                <Typography variant="caption" sx={{ color: getScoreColor(score), fontSize: "0.65rem", fontWeight: 700 }}>
                  {score >= 8 ? "High" : score >= 6 ? "Medium" : "Early"}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={score * 10}
                sx={{
                  height: 4, borderRadius: 2,
                  backgroundColor: "rgba(139,92,246,0.1)",
                  "& .MuiLinearProgress-bar": {
                    background: `linear-gradient(90deg, ${getScoreColor(score)}, ${getScoreColor(score)}aa)`,
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          )}

          {/* Blueprint chips */}
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 1.5 }}>
            {chain && (
              <Chip size="small" label={`⛓ ${chain}`}
                sx={{ fontSize: "0.68rem", height: 22, background: "rgba(6,182,212,0.1)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.22)" }} />
            )}
            {tokenSymbol && (
              <Chip size="small" label={`$${tokenSymbol}`}
                sx={{ fontSize: "0.68rem", height: 22, background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.22)" }} />
            )}
          </Box>

          {/* Tags */}
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {idea.tags?.slice(0, 3).map((tag) => (
              <Chip key={tag} label={tag} size="small"
                sx={{
                  fontSize: "0.63rem", height: 20,
                  background: `${getTagColor(tag)}12`,
                  color: getTagColor(tag),
                  border: `1px solid ${getTagColor(tag)}28`,
                }}
              />
            ))}
          </Box>
        </Box>
      </Link>

      {/* Footer */}
      <Box sx={{
        px: 2.5, py: 1.5,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "1px solid rgba(139,92,246,0.08)",
        background: "rgba(5,10,20,0.3)",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={(e) => { e.preventDefault(); onVote?.(idea.id); }}
              sx={{
                color: idea.userHasVoted ? "#8b5cf6" : "text.secondary",
                p: 0.4,
                "&:hover": { color: "#a78bfa", background: "rgba(139,92,246,0.1)" },
              }}
            >
              {idea.userHasVoted ? <ThumbUpAltIcon sx={{ fontSize: 15 }} /> : <ThumbUpAltOutlinedIcon sx={{ fontSize: 15 }} />}
            </IconButton>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.75rem" }}>
              {idea.voteCount}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.75rem" }}>
              {idea.commentCount}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
            {formatRelativeDate(idea.createdAt)}
          </Typography>
          <ArrowForwardIcon sx={{ fontSize: 13, color: "rgba(139,92,246,0.4)" }} />
        </Box>
      </Box>
    </MotionBox>
  );
}
