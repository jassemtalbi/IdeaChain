"use client";

import { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Chip, Button, Alert, Tabs, Tab } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TokenIcon from "@mui/icons-material/Token";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CodeIcon from "@mui/icons-material/Code";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import SpeedIcon from "@mui/icons-material/Speed";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { Blueprint } from "@/types";
import ReadinessScore from "@/components/blueprint/ReadinessScore";
import TokenModelCard from "@/components/blueprint/TokenModelCard";
import DAOStructureCard from "@/components/blueprint/DAOStructureCard";
import BlockchainCard from "@/components/blueprint/BlockchainCard";
import SmartContractCard from "@/components/blueprint/SmartContractCard";
import GTMCard from "@/components/blueprint/GTMCard";
import CompetitorCard from "@/components/blueprint/CompetitorCard";
import WhitepaperCard from "@/components/blueprint/WhitepaperCard";
import IdeaDNACard from "@/components/blueprint/IdeaDNACard";
import NFTOwnershipCard from "@/components/blueprint/NFTOwnershipCard";
import BusinessPlanCard from "@/components/blueprint/BusinessPlanCard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { ensureBlueprintDNA } from "@/lib/ensureDNA";

const MotionBox = motion(Box);

interface Props {
  blueprint: Blueprint;
  isMock?: boolean;
  rawIdea: string;
  onSave?: () => void;
  saving?: boolean;
}

const TAB_GROUPS = [
  {
    label: "Overview",
    icon: <SpeedIcon sx={{ fontSize: 16 }} />,
    cards: [
      { id: "readiness", component: (b: Blueprint) => <ReadinessScore data={b.readinessScore} />, cols: 1 },
      { id: "blockchain", component: (b: Blueprint) => <BlockchainCard data={b.recommendedBlockchain} />, cols: 1 },
    ],
  },
  {
    label: "Tokenomics",
    icon: <TokenIcon sx={{ fontSize: 16 }} />,
    cards: [
      { id: "token", component: (b: Blueprint) => <TokenModelCard data={b.tokenModel} />, cols: 2 },
    ],
  },
  {
    label: "Governance",
    icon: <AccountBalanceIcon sx={{ fontSize: 16 }} />,
    cards: [
      { id: "dao", component: (b: Blueprint) => <DAOStructureCard data={b.daoStructure} />, cols: 2 },
    ],
  },
  {
    label: "Tech",
    icon: <CodeIcon sx={{ fontSize: 16 }} />,
    cards: [
      { id: "contracts", component: (b: Blueprint) => <SmartContractCard data={b.smartContracts} />, cols: 2 },
    ],
  },
  {
    label: "Market",
    icon: <BarChartIcon sx={{ fontSize: 16 }} />,
    cards: [
      { id: "gtm", component: (b: Blueprint) => <GTMCard data={b.goToMarket} />, cols: 1 },
      { id: "competitors", component: (b: Blueprint) => <CompetitorCard data={b.competitorAnalysis} />, cols: 1 },
    ],
  },
  {
    label: "Whitepaper",
    icon: <DescriptionIcon sx={{ fontSize: 16 }} />,
    cards: [
      { id: "whitepaper", component: (b: Blueprint) => <WhitepaperCard data={b.whitepaper} />, cols: 2 },
    ],
  },
  {
    label: "Business Plan",
    icon: <BusinessCenterIcon sx={{ fontSize: 16 }} />,
    cards: [
      { id: "businessplan", component: (b: Blueprint) => <BusinessPlanCard data={b.businessPlan!} />, cols: 2 },
    ],
  },
  {
    label: "Ownership",
    icon: <FingerprintIcon sx={{ fontSize: 16 }} />,
    cards: [
      { id: "dna", component: (b: Blueprint) => <IdeaDNACard data={b.ideaDNA!} />, cols: 1 },
      { id: "nft", component: (b: Blueprint) => <NFTOwnershipCard data={b.nftMetadata!} dna={b.ideaDNA!} chainName={b.recommendedBlockchain.primary} />, cols: 1 },
    ],
  },
];

export default function BlueprintDisplay({ blueprint: rawBlueprint, isMock, rawIdea, onSave, saving }: Props) {
  const blueprint = ensureBlueprintDNA(rawBlueprint, rawIdea);
  const [tab, setTab] = useState(0);
  const activeGroup = TAB_GROUPS[tab];

  return (
    <Box>
      {/* Header banner */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          mb: 4, p: 3, borderRadius: 3,
          background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(139,92,246,0.06) 100%)",
          border: "1px solid rgba(16,185,129,0.25)",
        }}
      >
        {isMock && (
          <Alert severity="info" sx={{ mb: 2.5, background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", borderRadius: 2 }}>
            Demo mode — add your TOGETHER_API_KEY to .env.local for real AI blueprints
          </Alert>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <CheckCircleIcon sx={{ fontSize: 18, color: "#10b981" }} />
              <Typography variant="overline" sx={{ color: "#10b981", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.7rem" }}>
                BLUEPRINT READY
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, lineHeight: 1.3 }}>
              {rawIdea.length > 90 ? rawIdea.slice(0, 90) + "…" : rawIdea}
            </Typography>
            <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
              {blueprint.tags?.map((tag) => (
                <Chip key={tag} label={tag} size="small"
                  sx={{ background: "rgba(139,92,246,0.14)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.28)", fontSize: "0.7rem", height: 24 }} />
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              size="small"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              sx={{
                borderColor: "rgba(139,92,246,0.35)", color: "#a78bfa", borderRadius: 2, fontWeight: 600,
                "&:hover": { background: "rgba(139,92,246,0.08)", borderColor: "#8b5cf6" },
              }}
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
                sx={{
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  borderRadius: 2, fontWeight: 700,
                  boxShadow: "0 0 16px rgba(139,92,246,0.35)",
                  "&:hover": { boxShadow: "0 0 24px rgba(139,92,246,0.55)" },
                }}
              >
                {saving ? "Saving..." : "Save to Feed"}
              </Button>
            )}
          </Box>
        </Box>
      </MotionBox>

      {/* Tab navigation */}
      <Box sx={{
        mb: 3, borderRadius: 2.5,
        background: "rgba(13,22,40,0.6)",
        border: "1px solid rgba(139,92,246,0.12)",
        overflow: "hidden",
      }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": { background: "linear-gradient(90deg, #8b5cf6, #06b6d4)", height: 2.5 },
            "& .MuiTab-root": {
              textTransform: "none", fontWeight: 600, fontSize: "0.82rem",
              color: "text.secondary", minHeight: 52, px: 2.5,
              "&.Mui-selected": { color: "#a78bfa" },
              "&:hover": { color: "#a78bfa", background: "rgba(139,92,246,0.06)" },
            },
          }}
        >
          {TAB_GROUPS.map((group, i) => (
            <Tab
              key={group.label}
              label={group.label}
              icon={group.icon}
              iconPosition="start"
              value={i}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <MotionBox
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Grid container spacing={3}>
            {activeGroup.cards.map((card, i) => (
              <Grid item xs={12} md={card.cols === 1 ? 6 : 12} key={card.id}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
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
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
}
