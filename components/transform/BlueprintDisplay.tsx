"use client";

import { Box, Typography, Grid, Card, CardContent, Chip, Button, Alert } from "@mui/material";
import { motion } from "framer-motion";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import { Blueprint } from "@/types";
import ReadinessScore from "@/components/blueprint/ReadinessScore";
import TokenModelCard from "@/components/blueprint/TokenModelCard";
import DAOStructureCard from "@/components/blueprint/DAOStructureCard";
import BlockchainCard from "@/components/blueprint/BlockchainCard";
import SmartContractCard from "@/components/blueprint/SmartContractCard";
import GTMCard from "@/components/blueprint/GTMCard";
import CompetitorCard from "@/components/blueprint/CompetitorCard";
import WhitepaperCard from "@/components/blueprint/WhitepaperCard";

const MotionBox = motion(Box);

interface Props {
  blueprint: Blueprint;
  isMock?: boolean;
  rawIdea: string;
  onSave?: () => void;
  saving?: boolean;
}

const CARDS = [
  { id: "readiness", label: "Readiness Score", component: (b: Blueprint) => <ReadinessScore data={b.readinessScore} />, cols: 1 },
  { id: "token", label: "Token Model", component: (b: Blueprint) => <TokenModelCard data={b.tokenModel} />, cols: 1 },
  { id: "dao", label: "DAO Structure", component: (b: Blueprint) => <DAOStructureCard data={b.daoStructure} />, cols: 1 },
  { id: "blockchain", label: "Blockchain", component: (b: Blueprint) => <BlockchainCard data={b.recommendedBlockchain} />, cols: 1 },
  { id: "contracts", label: "Smart Contracts", component: (b: Blueprint) => <SmartContractCard data={b.smartContracts} />, cols: 1 },
  { id: "gtm", label: "Go-to-Market", component: (b: Blueprint) => <GTMCard data={b.goToMarket} />, cols: 1 },
  { id: "competitors", label: "Competitors", component: (b: Blueprint) => <CompetitorCard data={b.competitorAnalysis} />, cols: 2 },
  { id: "whitepaper", label: "Whitepaper", component: (b: Blueprint) => <WhitepaperCard data={b.whitepaper} />, cols: 2 },
];

export default function BlueprintDisplay({ blueprint, isMock, rawIdea, onSave, saving }: Props) {
  return (
    <Box>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ mb: 4 }}
      >
        {isMock && (
          <Alert severity="info" sx={{ mb: 2, background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4" }}>
            Demo mode — add your TOGETHER_API_KEY to .env.local for real AI blueprints
          </Alert>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="overline" sx={{ color: "#10b981", fontWeight: 700, letterSpacing: 3 }}>
              ✓ WEB3 BLUEPRINT READY
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5, maxWidth: 600 }}>
              {rawIdea.length > 80 ? rawIdea.slice(0, 80) + "..." : rawIdea}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
              {blueprint.tags?.map((tag) => (
                <Chip key={tag} label={tag} size="small"
                  sx={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)", fontSize: "0.72rem" }} />
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              size="small"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              sx={{ borderColor: "rgba(139,92,246,0.4)", color: "#8b5cf6", "&:hover": { background: "rgba(139,92,246,0.08)" } }}
            >
              Share
            </Button>
            {onSave && (
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                size="small"
                onClick={onSave}
                disabled={saving}
                sx={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}
              >
                {saving ? "Saving..." : "Save to Feed"}
              </Button>
            )}
          </Box>
        </Box>
      </MotionBox>

      {/* Blueprint cards grid */}
      <Grid container spacing={3}>
        {CARDS.map((card, i) => (
          <Grid item xs={12} md={card.cols === 2 ? 12 : 6} key={card.id}>
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              sx={{ height: "100%" }}
            >
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                  {card.component(blueprint)}
                </CardContent>
              </Card>
            </MotionBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
