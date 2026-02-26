"use client";

import { useState } from "react";
import { Container, Box, Grid, Skeleton, Typography, Button } from "@mui/material";
import FeedFilters from "@/components/explore/FeedFilters";
import IdeaCard from "@/components/explore/IdeaCard";
import { useIdeas } from "@/hooks/useIdeas";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";

export default function ExplorePage() {
  const [sort, setSort] = useState("latest");
  const { data, isLoading, error } = useIdeas(sort);
  const ideas = (data as { ideas: unknown[] } | null)?.ideas ?? (Array.isArray(data) ? data : []);
  const router = useRouter();

  return (
    <Box sx={{ minHeight: "100vh", py: 8, background: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.05) 0%, transparent 50%)" }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4, flexWrap: "wrap", gap: 2 }}>
          <FeedFilters sort={sort} onSort={setSort} />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/transform")}
            sx={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}
          >
            New Blueprint
          </Button>
        </Box>

        {isLoading && (
          <Grid container spacing={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rounded" height={280} sx={{ bgcolor: "rgba(139,92,246,0.08)", borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        )}

        {error && (
          <Box sx={{ textAlign: "center", py: 12 }}>
            <Typography color="error">Failed to load ideas. Please try again.</Typography>
          </Box>
        )}

        {ideas && ideas.length === 0 && (
          <Box sx={{ textAlign: "center", py: 12 }}>
            <Typography variant="h6" color="text.secondary">No ideas yet.</Typography>
            <Button onClick={() => router.push("/transform")} variant="contained" sx={{ mt: 2 }}>
              Be the first to transform an idea
            </Button>
          </Box>
        )}

        {ideas && ideas.length > 0 && (
          <Grid container spacing={3}>
            {ideas.map((idea) => (
              <Grid item xs={12} sm={6} md={4} key={idea.id}>
                <IdeaCard idea={idea} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
