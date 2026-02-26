"use client";

import { Box, Typography, Chip, Button, Tooltip, Divider } from "@mui/material";
import { motion } from "framer-motion";
import TokenIcon from "@mui/icons-material/Token";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import LockIcon from "@mui/icons-material/Lock";
import { NFTMetadata, IdeaDNA } from "@/types";

const MotionBox = motion(Box);

interface Props {
  data: NFTMetadata;
  dna: IdeaDNA;
  chainName: string;
}

function getHowItWorks(royaltyPercent: number) {
  return [
    {
      num: 1,
      icon: <FingerprintIcon sx={{ fontSize: 18 }} />,
      title: "DNA Fingerprint",
      desc: "AI extracts 7 core components of your idea and hashes them into a unique on-chain fingerprint.",
      color: "#8b5cf6",
    },
    {
      num: 2,
      icon: <TokenIcon sx={{ fontSize: 18 }} />,
      title: "NFT Minting",
      desc: "Idea minted as ERC-721 NFT with your wallet, block timestamp, and full transformation metadata.",
      color: "#06b6d4",
    },
    {
      num: 3,
      icon: <AccountTreeIcon sx={{ fontSize: 18 }} />,
      title: "Fork Tracking",
      desc: "Every derivative idea creates a child NFT with parentId. Immutable family tree — like Git for IP.",
      color: "#10b981",
    },
    {
      num: 4,
      icon: <MonetizationOnIcon sx={{ fontSize: 18 }} />,
      title: "Auto Royalties",
      desc: `Child idea earns revenue? Smart contract auto-routes ${royaltyPercent}% back to parent holder. Forever.`,
      color: "#f59e0b",
    },
  ];
}

function truncateAddr(addr: string) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function truncateURI(uri: string) {
  return uri.slice(0, 20) + "..." + uri.slice(-8);
}

export default function NFTOwnershipCard({ data, dna, chainName }: Props) {
  const HOW_IT_WORKS = getHowItWorks(data.royaltyPercent);
  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <TokenIcon sx={{ color: "#06b6d4", fontSize: 24 }} />
        <Typography variant="h6" fontWeight={700}>On-Chain Ownership</Typography>
        <Chip label="Coming Soon" size="small" sx={{ ml: "auto", background: "rgba(139,92,246,0.12)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)", fontSize: "0.65rem", height: 22 }} />
      </Box>

      {/* NFT Visual Card */}
      <MotionBox
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        sx={{
          mb: 3, p: 2.5, borderRadius: 3,
          background: "linear-gradient(135deg, rgba(13,22,40,0.9) 0%, rgba(20,30,56,0.9) 100%)",
          border: "1.5px solid rgba(6,182,212,0.35)",
          boxShadow: "0 0 32px rgba(6,182,212,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <Box sx={{
          position: "absolute", top: -40, right: -40, width: 160, height: 160,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Token ID + standard row */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box>
            <Typography sx={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "1.6rem", fontWeight: 800, color: "#fff", lineHeight: 1,
            }}>
              {data.tokenId}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>Idea NFT</Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Chip label={data.standard}
              sx={{ background: "rgba(6,182,212,0.15)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)", fontSize: "0.7rem", fontWeight: 700, height: 24 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, fontSize: "0.65rem" }}>{chainName}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2, borderColor: "rgba(6,182,212,0.12)" }} />

        {/* Metadata rows */}
        {[
          { label: "Contract", value: truncateAddr(data.contract), mono: true },
          { label: "Fingerprint", value: truncateAddr(dna.fingerprint), mono: true },
          { label: "Metadata URI", value: truncateURI(data.metadataURI), mono: true },
          { label: "Royalty", value: `${data.royaltyPercent}% of derivative revenue`, mono: false },
        ].map((row) => (
          <Box key={row.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.25 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", letterSpacing: "0.03em" }}>
              {row.label}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: row.mono ? "'JetBrains Mono', monospace" : "inherit",
                fontSize: "0.72rem",
                color: row.label === "Royalty" ? "#f59e0b" : "#a78bfa",
                fontWeight: 600,
              }}
            >
              {row.value}
            </Typography>
          </Box>
        ))}
      </MotionBox>

      {/* How it works */}
      <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 2, letterSpacing: "0.06em", fontSize: "0.68rem" }}>
        HOW IT WORKS
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
        {HOW_IT_WORKS.map((step, i) => (
          <MotionBox
            key={step.num}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
          >
            <Box sx={{
              width: 36, height: 36, borderRadius: "10px", flexShrink: 0,
              background: `${step.color}18`,
              border: `1px solid ${step.color}35`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: step.color,
            }}>
              {step.icon}
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
                <Typography variant="caption" sx={{
                  color: step.color, fontWeight: 800,
                  fontSize: "0.65rem", letterSpacing: "0.06em",
                }}>
                  STEP {step.num}
                </Typography>
                <Typography variant="caption" fontWeight={700} sx={{ fontSize: "0.82rem" }}>{step.title}</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: "0.78rem", display: "block" }}>
                {step.desc}
              </Typography>
            </Box>
          </MotionBox>
        ))}
      </Box>

      {/* Real Example */}
      <MotionBox
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        sx={{
          mb: 3, p: 2.5, borderRadius: 3,
          background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(245,158,11,0.06) 100%)",
          border: "1px solid rgba(245,158,11,0.25)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <AutoAwesomeIcon sx={{ fontSize: 15, color: "#f59e0b" }} />
          <Typography variant="caption" fontWeight={700} sx={{ color: "#f59e0b", fontSize: "0.7rem", letterSpacing: "0.06em" }}>
            REAL EXAMPLE
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7, fontSize: "0.83rem" }}>
          You submit an idea.{" "}
          <Box component="span" sx={{ color: "#a78bfa", fontWeight: 700 }}>3 people fork it.</Box>{" "}
          One fork gets funded for{" "}
          <Box component="span" sx={{ color: "#10b981", fontWeight: 700 }}>$50,000</Box>.
        </Typography>

        <Box sx={{
          p: 2, borderRadius: 2,
          background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.2)",
          textAlign: "center", mb: 1.5,
        }}>
          <Typography sx={{
            fontSize: "2rem", fontWeight: 900, color: "#f59e0b",
            lineHeight: 1, letterSpacing: "-0.02em",
          }}>
            $4,000
          </Typography>
          <Typography variant="caption" sx={{ color: "#f59e0b", fontWeight: 600, fontSize: "0.8rem" }}>
            automatically sent to you
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, fontSize: "0.72rem" }}>
            when the first milestone pays out
          </Typography>
        </Box>

        <Box sx={{
          display: "flex", alignItems: "center", gap: 1,
          p: 1.25, borderRadius: 2, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)",
        }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", flexShrink: 0, boxShadow: "0 0 6px #10b981" }} />
          <Typography variant="caption" sx={{ color: "#10b981", fontWeight: 600, fontSize: "0.75rem" }}>
            No action required. Smart contract handles everything.
          </Typography>
        </Box>
      </MotionBox>

      {/* Mint CTA */}
      <Tooltip title="NFT minting launches with mainnet deployment — Q3 2025" placement="top">
        <span style={{ display: "block" }}>
          <Button
            fullWidth
            variant="outlined"
            disabled
            startIcon={<LockIcon fontSize="small" />}
            sx={{
              borderColor: "rgba(139,92,246,0.25)",
              color: "rgba(167,139,250,0.4)",
              borderRadius: 2, fontWeight: 700, py: 1.5,
              "&.Mui-disabled": {
                borderColor: "rgba(139,92,246,0.2)",
                color: "rgba(167,139,250,0.35)",
              },
            }}
          >
            Mint Idea NFT — Coming Soon · Mainnet Q3 2025
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
