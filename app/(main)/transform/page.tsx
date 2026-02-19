"use client";

import { useState } from "react";
import { Container, Box, Typography, Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import IdeaInput from "@/components/transform/IdeaInput";
import LoadingAnimation from "@/components/transform/LoadingAnimation";
import BlueprintDisplay from "@/components/transform/BlueprintDisplay";
import { useTransform } from "@/hooks/useTransform";
import { useSaveIdea } from "@/hooks/useIdeas";
import { Blueprint } from "@/types";

const MotionBox = motion(Box);

type Stage = "input" | "loading" | "result";

export default function TransformPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("input");
  const [rawIdea, setRawIdea] = useState("");
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [snackbar, setSnackbar] = useState("");

  const { mutate: transform } = useTransform();
  const { mutate: saveIdea, isPending: saving } = useSaveIdea();

  const handleSubmit = (idea: string) => {
    setRawIdea(idea);
    setStage("loading");

    transform(idea, {
      onSuccess: (result) => {
        setBlueprint(result.blueprint);
        setIsMock(result.isMock);
        setStage("result");
      },
      onError: () => {
        setStage("input");
        setSnackbar("Failed to transform idea. Please try again.");
      },
    });
  };

  const handleSave = () => {
    if (!blueprint) return;
    saveIdea(
      {
        title: rawIdea.slice(0, 80),
        rawIdea,
        blueprint,
        tags: blueprint.tags || [],
      },
      {
        onSuccess: (data) => {
          setSnackbar("Idea saved to feed!");
          setTimeout(() => router.push(`/idea/${data.id}`), 1000);
        },
        onError: () => setSnackbar("Failed to save. Please sign in first."),
      }
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 8, background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 50%)" }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="overline" sx={{ color: "#8b5cf6", fontWeight: 700, letterSpacing: 3 }}>
            AI TRANSFORMER
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
            Web2 → Web3 Blueprint
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Describe any startup idea. Get a complete Web3 transformation in 30 seconds.
          </Typography>
        </Box>

        <AnimatePresence mode="wait">
          {stage === "input" && (
            <MotionBox
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              sx={{ maxWidth: 680, mx: "auto" }}
            >
              <Box sx={{
                p: 4,
                background: "rgba(13, 22, 40, 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: 3,
              }}>
                <IdeaInput onSubmit={handleSubmit} loading={false} />
              </Box>
            </MotionBox>
          )}

          {stage === "loading" && (
            <MotionBox
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{
                maxWidth: 680,
                mx: "auto",
                p: 4,
                background: "rgba(13, 22, 40, 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: 3,
              }}
            >
              <LoadingAnimation />
            </MotionBox>
          )}

          {stage === "result" && blueprint && (
            <MotionBox
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BlueprintDisplay
                blueprint={blueprint}
                isMock={isMock}
                rawIdea={rawIdea}
                onSave={handleSave}
                saving={saving}
              />
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar("")}
        message={snackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
