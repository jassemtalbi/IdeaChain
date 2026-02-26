"use client";

import { useState } from "react";
import { Container, Box, Grid, Skeleton, Typography, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import FeedFilters from "@/components/explore/FeedFilters";
import IdeaCard from "@/components/explore/IdeaCard";
import { useIdeas } from "@/hooks/useIdeas";
import { useRouter } from "next/navigation";
import BoltIcon from "@mui/icons-material/Bolt";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

export default function ExplorePage() {
  const [sort, setSort] = useState("latest");
  const { data, isLoading, error } = useIdeas(sort);
  const ideas = (data as { ideas: unknown[] } | null)?.ideas ?? (Array.isArray(data) ? data : []);
  const router = useRouter();

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 55%)",
    }}>
      {/* Page header */}
      <Box sx={{
        borderBottom: "1px solid rgba(139,92,246,0.1)",
        background: "rgba(5,10,20,0.6)",
        backdropFilter: "blur(12px)",
        py: 5,
      }}>
        <Container maxWidth="xl">
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Chip
              icon={<ExploreOutlinedIcon sx={{ fontSize: 14, color: "#06b6d4 !important" }} />}
              label="Community Blueprints"
              sx={{
                mb: 2, height: 28,
                background: "rgba(6,182,212,0.1)",
                border: "1px solid rgba(6,182,212,0.3)",
                color: "#06b6d4", fontWeight: 600, fontSize: "0.7rem",
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  Explore{" "}
                  <Box component="span" sx={{
                    background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    Web3 Ideas
                  </Box>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                  Browse AI-generated blueprints from the community
                </Typography>
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

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Filters */}
        <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} sx={{ mb: 4 }}>
          <FeedFilters sort={sort} onSort={setSort} />
        </MotionBox>

        {/* Loading skeletons */}
        {isLoading && (
          <Grid container spacing={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton
                  variant="rounded"
                  height={300}
                  sx={{ bgcolor: "rgba(139,92,246,0.07)", borderRadius: 3 }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Error state */}
        {error && (
          <Box sx={{ textAlign: "center", py: 14 }}>
            <Typography variant="h6" color="error.main" sx={{ mb: 1 }}>Failed to load ideas</Typography>
            <Typography variant="body2" color="text.secondary">Please check your connection and try again.</Typography>
          </Box>
        )}

        {/* Empty state */}
        {!isLoading && ideas && ideas.length === 0 && (
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            sx={{ textAlign: "center", py: 14 }}
          >
            <Box sx={{
              width: 80, height: 80, borderRadius: "50%", mx: "auto", mb: 3,
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <AutoAwesomeIcon sx={{ fontSize: 36, color: "#8b5cf6" }} />
            </Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>No blueprints yet</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 360, mx: "auto" }}>
              Be the first to transform a Web2 idea into a full Web3 blueprint.
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
        )}

        {/* Ideas grid */}
        {ideas && ideas.length > 0 && (
          <Grid container spacing={3}>
            {ideas.map((idea, i) => (
              <MotionGrid
                item xs={12} sm={6} md={4}
                key={idea.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <IdeaCard idea={idea} />
              </MotionGrid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
