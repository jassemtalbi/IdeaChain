"use client";

import { useState } from "react";
import { Box, Typography, Collapse, Button, IconButton, Tooltip } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Whitepaper } from "@/types";

interface Props { data: Whitepaper; }

const SECTIONS = [
  { key: "abstract" as keyof Whitepaper, label: "Abstract" },
  { key: "problem" as keyof Whitepaper, label: "Problem Statement" },
  { key: "solution" as keyof Whitepaper, label: "Solution" },
  { key: "tokenEconomics" as keyof Whitepaper, label: "Token Economics" },
  { key: "technicalArchitecture" as keyof Whitepaper, label: "Technical Architecture" },
  { key: "roadmap" as keyof Whitepaper, label: "Roadmap" },
].filter((s) => true); // all sections shown, optional ones render blank-safe

export default function WhitepaperCard({ data }: Props) {
  const [expanded, setExpanded] = useState<string>("abstract");
  const [copied, setCopied] = useState(false);

  const fullText = SECTIONS.filter((s) => !!data[s.key]).map((s) => `## ${s.label}\n\n${data[s.key]}`).join("\n\n---\n\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DescriptionIcon sx={{ color: "#10b981" }} />
          <Typography variant="h6" fontWeight={700}>Whitepaper Draft</Typography>
        </Box>
        <Tooltip title={copied ? "Copied!" : "Copy full whitepaper"}>
          <IconButton size="small" onClick={handleCopy} sx={{ color: copied ? "#10b981" : "text.secondary" }}>
            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      {SECTIONS.filter((s) => !!data[s.key]).map((section) => {
        const isOpen = expanded === section.key;
        return (
          <Box key={section.key} sx={{ mb: 1, borderRadius: 2, overflow: "hidden", border: "1px solid rgba(139,92,246,0.15)" }}>
            <Button
              fullWidth
              onClick={() => setExpanded(isOpen ? "" : section.key)}
              sx={{
                justifyContent: "space-between",
                px: 2,
                py: 1.25,
                background: isOpen ? "rgba(16,185,129,0.08)" : "rgba(13,22,40,0.5)",
                color: isOpen ? "#10b981" : "text.primary",
                fontWeight: 600,
                fontSize: "0.85rem",
                textTransform: "none",
                borderRadius: 0,
                "&:hover": { background: "rgba(16,185,129,0.06)" },
              }}
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    fontSize: 18,
                  }}
                />
              }
            >
              {section.label}
            </Button>
            <Collapse in={isOpen}>
              <Box sx={{ px: 2, py: 2, background: "rgba(13,22,40,0.3)" }}>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {data[section.key]}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
}
