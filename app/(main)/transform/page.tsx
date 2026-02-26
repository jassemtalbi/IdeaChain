"use client";

import { useState } from "react";
import { Container, Box, Typography, Snackbar, Chip } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import IdeaInput from "@/components/transform/IdeaInput";
import LoadingAnimation from "@/components/transform/LoadingAnimation";
import BlueprintDisplay from "@/components/transform/BlueprintDisplay";
import { useTransform } from "@/hooks/useTransform";
import { useSaveIdea } from "@/hooks/useIdeas";
import { Blueprint } from "@/types";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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
      { title: rawIdea.slice(0, 80), rawIdea, blueprint, tags: blueprint.tags || [] },
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
    <Box sx={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(139,92,246,0.09) 0%, transparent 55%)",
    }}>
      {/* Page header */}
      <Box sx={{
        borderBottom: "1px solid rgba(139,92,246,0.1)",
        background: "rgba(5,10,20,0.5)",
        backdropFilter: "blur(12px)",
        py: 5,
        textAlign: "center",
      }}>
        <Container maxWidth="md">
          <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 14, color: "#a78bfa !important" }} />}
              label="AI Transformer · Llama 3.3 70B"
              sx={{
                mb: 2, height: 28,
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#a78bfa", fontWeight: 600, fontSize: "0.7rem",
              }}
            />
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{ letterSpacing: "-0.025em", mb: 1, lineHeight: 1.15 }}
            >
              Web2{" "}
              <Box component="span" sx={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                →{" "}Web3
              </Box>{" "}Blueprint
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: "auto" }}>
              Describe any startup idea. Get a complete Web3 transformation in ~30 seconds.
            </Typography>
          </MotionBox>
        </Container>
      </Box>

      <Container maxWidth={stage === "result" ? "xl" : "md"} sx={{ py: 6 }}>
        <AnimatePresence mode="wait">
          {stage === "input" && (
            <MotionBox
              key="input"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Box sx={{
                p: { xs: 3, md: 4.5 },
                background: "rgba(13,22,40,0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(139,92,246,0.18)",
                borderRadius: 3,
                boxShadow: "0 8px 48px rgba(0,0,0,0.4)",
              }}>
                <IdeaInput onSubmit={handleSubmit} loading={false} />
              </Box>
            </MotionBox>
          )}

          {stage === "loading" && (
            <MotionBox
              key="loading"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              sx={{
                p: { xs: 3, md: 5 },
                background: "rgba(13,22,40,0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(139,92,246,0.18)",
                borderRadius: 3,
                boxShadow: "0 8px 48px rgba(0,0,0,0.4)",
              }}
            >
              <LoadingAnimation />
            </MotionBox>
          )}

          {stage === "result" && blueprint && (
            <MotionBox
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
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
