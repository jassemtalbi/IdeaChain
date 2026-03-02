"use client";

import Link from "next/link";
import { Box, Container, Typography, Divider, Stack, IconButton } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid rgba(139, 92, 246, 0.15)",
        background: "rgba(5, 10, 20, 0.9)",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 4 }}>
          {/* Brand */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <AutoAwesomeIcon sx={{ color: "#8b5cf6" }} />
              <Typography fontWeight={800} sx={{ background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Ideon
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280 }}>
              Web2 ideas deserve a Web3 future. AI-powered transformation platform for the next generation of founders.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton size="small" sx={{ color: "text.secondary", "&:hover": { color: "#8b5cf6" } }}>
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "text.secondary", "&:hover": { color: "#06b6d4" } }}>
                <XIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {/* Links */}
          <Box sx={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
                Platform
              </Typography>
              <Stack spacing={1.5}>
                {[{ label: "Transform Idea", href: "/transform" }, { label: "Explore Ideas", href: "/explore" }, { label: "Dashboard", href: "/dashboard" }].map((l) => (
                  <Typography key={l.href} variant="body2" component={Link} href={l.href}
                    sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: "#8b5cf6" } }}>
                    {l.label}
                  </Typography>
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
                Web3 Stack
              </Typography>
              <Stack spacing={1.5}>
                {["Polygon", "Arbitrum", "Base", "Ethereum"].map((chain) => (
                  <Typography key={chain} variant="body2" color="text.secondary">{chain}</Typography>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Ideon. Built for the decentralized future.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Powered by{" "}
            <Box component="span" sx={{ color: "#8b5cf6" }}>TogetherAI</Box>
            {" "}+{" "}
            <Box component="span" sx={{ color: "#06b6d4" }}>Next.js</Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
