"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar, Toolbar, Box, Button, IconButton, Avatar, Menu, MenuItem,
  Typography, Drawer, List, ListItem, ListItemButton, ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { signOut } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";

const NAV_LINKS = [
  { label: "Explore", href: "/explore" },
  { label: "Transform", href: "/transform" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, currentUser } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuClose = () => setAnchorEl(null);
  const handleSignOut = () => { signOut(); handleMenuClose(); };

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{
        background: "rgba(5,10,20,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139,92,246,0.15)", zIndex: 1100,
      }}>
        <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <AutoAwesomeIcon sx={{ color: "#8b5cf6", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={800} sx={{
              background: "linear-gradient(135deg,#8b5cf6,#06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em",
            }}>IdeaChain</Typography>
          </Link>

          {/* Desktop nav links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {NAV_LINKS.map((link) => (
              <Button key={link.href} component={Link} href={link.href} sx={{
                color: pathname === link.href ? "#8b5cf6" : "text.secondary", fontWeight: 600,
                "&:hover": { color: "#8b5cf6", background: "rgba(139,92,246,0.08)" },
                borderBottom: pathname === link.href ? "2px solid #8b5cf6" : "2px solid transparent",
                borderRadius: "8px 8px 0 0",
              }}>{link.label}</Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Avatar src={currentUser?.avatar} sx={{ width: 36, height: 36, border: "2px solid rgba(139,92,246,0.5)" }}>
                    {currentUser?.name?.[0]?.toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}
                  PaperProps={{ sx: { mt: 1, minWidth: 180 } }}>
                  <MenuItem component={Link} href="/dashboard" onClick={handleMenuClose}>
                    <DashboardIcon fontSize="small" sx={{ mr: 1 }} /> Dashboard
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleSignOut} sx={{ color: "error.main" }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Sign out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="outlined" size="small" onClick={() => setAuthOpen(true)} sx={{
                borderColor: "rgba(139,92,246,0.5)", color: "#8b5cf6", fontWeight: 600,
                "&:hover": { borderColor: "#8b5cf6", background: "rgba(139,92,246,0.08)" },
              }}>Sign In</Button>
            )}
            {/* Mobile hamburger */}
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "text.secondary", display: { xs: "flex", md: "none" } }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, background: "#0d1628", borderLeft: "1px solid rgba(139,92,246,0.2)" } }}>
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: "#8b5cf6" }} />
          <Typography fontWeight={700} sx={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            IdeaChain
          </Typography>
        </Box>
        <Divider />
        <List>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton component={Link} href={link.href} onClick={() => setDrawerOpen(false)}>
                <ListItemText primary={link.label} primaryTypographyProps={{
                  fontWeight: pathname === link.href ? 700 : 400,
                  color: pathname === link.href ? "#8b5cf6" : "text.secondary",
                }} />
              </ListItemButton>
            </ListItem>
          ))}
          {!isAuthenticated && (
            <ListItem sx={{ mt: 2, px: 2 }}>
              <Button fullWidth variant="outlined" onClick={() => { setDrawerOpen(false); setAuthOpen(true); }}
                sx={{ borderColor: "rgba(139,92,246,0.5)", color: "#8b5cf6" }}>Sign In</Button>
            </ListItem>
          )}
        </List>
      </Drawer>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
