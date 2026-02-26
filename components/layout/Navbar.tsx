"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar, Toolbar, Box, Button, IconButton, Avatar, Menu, MenuItem,
  Typography, Drawer, List, ListItem, ListItemButton, Divider, Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import BoltIcon from "@mui/icons-material/Bolt";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";

const NAV_LINKS = [
  { label: "Explore", href: "/explore", icon: <ExploreIcon sx={{ fontSize: 16 }} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuClose = () => setAnchorEl(null);
  const handleSignOut = () => { logout(); handleMenuClose(); };

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{
        background: "rgba(5,10,20,0.9)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(139,92,246,0.12)",
        zIndex: 1100,
      }}>
        <Toolbar sx={{ justifyContent: "space-between", py: 0.75, minHeight: { xs: 60, sm: 64 } }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: "10px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(139,92,246,0.45)",
            }}>
              <AutoAwesomeIcon sx={{ color: "#fff", fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={800} sx={{
                background: "linear-gradient(135deg,#a78bfa,#06b6d4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em", lineHeight: 1.1, fontSize: "1.05rem",
              }}>
                IdeaChain
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(148,163,184,0.6)", letterSpacing: "0.08em", fontSize: "0.55rem", lineHeight: 1 }}>
                WEB2 → WEB3
              </Typography>
            </Box>
          </Link>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  startIcon={link.icon}
                  sx={{
                    color: active ? "#a78bfa" : "text.secondary",
                    fontWeight: 600,
                    px: 1.75,
                    borderRadius: 2,
                    background: active ? "rgba(139,92,246,0.12)" : "transparent",
                    border: active ? "1px solid rgba(139,92,246,0.25)" : "1px solid transparent",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#a78bfa", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" },
                    transition: "all 0.2s",
                  }}
                >
                  {link.label}
                </Button>
              );
            })}

            {/* Transform CTA */}
            <Button
              component={Link}
              href="/transform"
              variant="contained"
              startIcon={<BoltIcon sx={{ fontSize: 16 }} />}
              sx={{
                ml: 1,
                background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                boxShadow: "0 0 20px rgba(139,92,246,0.35)",
                fontWeight: 700,
                px: 2,
                borderRadius: 2,
                fontSize: "0.875rem",
                "&:hover": {
                  background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
                  boxShadow: "0 0 28px rgba(139,92,246,0.55)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Transform
            </Button>
          </Box>

          {/* Right actions */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
                  <Avatar
                    src={currentUser?.avatar}
                    sx={{
                      width: 36, height: 36,
                      border: "2px solid rgba(139,92,246,0.5)",
                      boxShadow: "0 0 12px rgba(139,92,246,0.3)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {currentUser?.name?.[0]?.toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  PaperProps={{
                    sx: {
                      mt: 1.5, minWidth: 200,
                      background: "#0d1628",
                      border: "1px solid rgba(139,92,246,0.2)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
                    <Typography variant="subtitle2" fontWeight={700}>{currentUser?.name}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>{currentUser?.email}</Typography>
                  </Box>
                  <MenuItem component={Link} href="/dashboard" onClick={handleMenuClose}
                    sx={{ gap: 1.5, py: 1.25, "&:hover": { background: "rgba(139,92,246,0.08)" } }}>
                    <DashboardIcon fontSize="small" sx={{ color: "#8b5cf6" }} />
                    <Typography variant="body2">Dashboard</Typography>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleSignOut}
                    sx={{ gap: 1.5, py: 1.25, "&:hover": { background: "rgba(239,68,68,0.08)" } }}>
                    <LogoutIcon fontSize="small" sx={{ color: "#ef4444" }} />
                    <Typography variant="body2" sx={{ color: "#ef4444" }}>Sign out</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setAuthOpen(true)}
                sx={{
                  display: { xs: "none", md: "flex" },
                  borderColor: "rgba(139,92,246,0.4)",
                  color: "#a78bfa",
                  fontWeight: 600,
                  borderRadius: 2,
                  "&:hover": { borderColor: "#8b5cf6", background: "rgba(139,92,246,0.08)" },
                }}
              >
                Sign In
              </Button>
            )}

            {/* Mobile hamburger */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: "text.secondary", display: { xs: "flex", md: "none" }, ml: 0.5 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: "#070f1f",
            borderLeft: "1px solid rgba(139,92,246,0.15)",
          },
        }}
      >
        {/* Drawer header */}
        <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: "8px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <AutoAwesomeIcon sx={{ color: "#fff", fontSize: 17 }} />
            </Box>
            <Typography fontWeight={800} sx={{ background: "linear-gradient(135deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              IdeaChain
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setDrawerOpen(false)} sx={{ color: "text.secondary" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* User profile in drawer */}
        {isAuthenticated && (
          <Box sx={{ p: 2, borderBottom: "1px solid rgba(139,92,246,0.08)" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar src={currentUser?.avatar} sx={{ width: 40, height: 40, border: "2px solid rgba(139,92,246,0.4)" }}>
                {currentUser?.name?.[0]?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight={700}>{currentUser?.name}</Typography>
                <Typography variant="caption" color="text.secondary">{currentUser?.email}</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Nav links */}
        <List sx={{ px: 1, py: 1.5, flexGrow: 1 }}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <ListItem key={link.href} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    borderRadius: 2,
                    background: active ? "rgba(139,92,246,0.12)" : "transparent",
                    border: active ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
                    "&:hover": { background: "rgba(139,92,246,0.08)" },
                    gap: 1.5, py: 1.25,
                  }}
                >
                  <Box sx={{ color: active ? "#a78bfa" : "text.secondary", display: "flex" }}>{link.icon}</Box>
                  <Typography variant="body2" fontWeight={active ? 700 : 400} sx={{ color: active ? "#a78bfa" : "text.secondary" }}>
                    {link.label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })}

          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href="/transform"
              onClick={() => setDrawerOpen(false)}
              sx={{
                borderRadius: 2,
                background: pathname === "/transform" ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.25)",
                "&:hover": { background: "rgba(139,92,246,0.15)" },
                gap: 1.5, py: 1.25,
              }}
            >
              <BoltIcon sx={{ fontSize: 16, color: "#8b5cf6" }} />
              <Typography variant="body2" fontWeight={700} sx={{ color: "#a78bfa" }}>
                Transform Idea
              </Typography>
              <Chip label="AI" size="small" sx={{ ml: "auto", background: "rgba(139,92,246,0.2)", color: "#a78bfa", fontSize: "0.65rem", height: 18 }} />
            </ListItemButton>
          </ListItem>

          {isAuthenticated && (
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href="/dashboard"
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: 2,
                  background: pathname === "/dashboard" ? "rgba(139,92,246,0.12)" : "transparent",
                  border: pathname === "/dashboard" ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
                  "&:hover": { background: "rgba(139,92,246,0.08)" },
                  gap: 1.5, py: 1.25,
                }}
              >
                <DashboardIcon sx={{ fontSize: 16, color: pathname === "/dashboard" ? "#a78bfa" : "text.secondary" }} />
                <Typography variant="body2" fontWeight={pathname === "/dashboard" ? 700 : 400} sx={{ color: pathname === "/dashboard" ? "#a78bfa" : "text.secondary" }}>
                  Dashboard
                </Typography>
              </ListItemButton>
            </ListItem>
          )}
        </List>

        {/* Bottom action */}
        <Box sx={{ p: 2, borderTop: "1px solid rgba(139,92,246,0.1)" }}>
          {isAuthenticated ? (
            <Button
              fullWidth
              onClick={() => { logout(); setDrawerOpen(false); }}
              startIcon={<LogoutIcon fontSize="small" />}
              sx={{ color: "#ef4444", borderColor: "rgba(239,68,68,0.3)", border: "1px solid", borderRadius: 2, justifyContent: "flex-start", px: 2, py: 1, "&:hover": { background: "rgba(239,68,68,0.06)" } }}
            >
              Sign out
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={() => { setDrawerOpen(false); setAuthOpen(true); }}
              sx={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", borderRadius: 2, fontWeight: 700, py: 1.25 }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Drawer>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
