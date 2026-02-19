"use client";

import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IdeaCard from "@/components/explore/IdeaCard";
import { MOCK_IDEAS } from "@/lib/mock/ideas";

export default function FeaturedIdeas() {
  const router = useRouter();
  const featured = MOCK_IDEAS.slice(0, 3);

  return (
    <Box sx={{ py: 10, background: "rgba(13,22,40,0.4)" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="overline" sx={{ color: "#ec4899", fontWeight: 700, letterSpacing: 3 }}>
              FEATURED IDEAS
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5 }}>
              Explore What's Being Built
            </Typography>
          </Box>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => router.push("/explore")}
            sx={{ color: "#8b5cf6", borderColor: "rgba(139,92,246,0.4)", "&:hover": { background: "rgba(139,92,246,0.08)" } }}
            variant="outlined"
          >
            View All Ideas
          </Button>
        </Box>

        <Grid container spacing={3}>
          {featured.map((idea) => (
            <Grid item xs={12} md={4} key={idea.id}>
              <IdeaCard idea={idea} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
