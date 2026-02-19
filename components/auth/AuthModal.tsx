"use client";

import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, Box, TextField,
  Button, Typography, Divider, IconButton, Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import { signIn } from "next-auth/react";

interface AuthModalProps { open: boolean; onClose: () => void; }

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) setError("Login failed. Please try again.");
      else onClose();
    } catch { setError("Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      PaperProps={{ sx: { background: "rgba(13,22,40,0.97)", backdropFilter: "blur(20px)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 3 } }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailIcon sx={{ color: "#8b5cf6" }} />
          <Typography variant="h6" fontWeight={700} sx={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Sign in to IdeaChain
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleLogin} sx={{ pt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField fullWidth label="Email address" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }} placeholder="you@example.com" />
          <TextField fullWidth label="Password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} placeholder="Any password"
            helperText="MVP mode: any password creates or accesses your account" />
          <Button fullWidth type="submit" variant="contained" size="large" disabled={loading || !email}
            sx={{ mb: 2, background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", "&:hover": { background: "linear-gradient(135deg,#a78bfa,#7c3aed)" } }}>
            {loading ? "Signing in..." : "Continue with Email"}
          </Button>
          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center" }}>
            No account needed — created automatically on first sign-in.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
