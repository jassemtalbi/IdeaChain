"use client";

import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, Box, TextField,
  Button, Typography, Divider, IconButton, Alert, Tabs, Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps { open: boolean; onClose: () => void; }

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState(0); // 0 = login, 1 = register
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => { setEmail(""); setName(""); setPassword(""); setError(""); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (tab === 0) {
        await login(email, password);
      } else {
        if (!name.trim()) { setError("Name is required"); return; }
        await register(email, name, password);
      }
      reset();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      PaperProps={{ sx: { background: "rgba(13,22,40,0.97)", backdropFilter: "blur(20px)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 3 } }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: "#8b5cf6" }} />
          <Typography variant="h6" fontWeight={700} sx={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Ideon
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={(_, v) => { setTab(v); reset(); }} sx={{ mb: 2, "& .MuiTab-root": { color: "text.secondary", fontWeight: 600 }, "& .Mui-selected": { color: "#8b5cf6" }, "& .MuiTabs-indicator": { bgcolor: "#8b5cf6" } }}>
          <Tab label="Sign In" />
          <Tab label="Register" />
        </Tabs>
        <Box component="form" onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField fullWidth label="Email address" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }} placeholder="you@example.com" size="small" />
          {tab === 1 && (
            <TextField fullWidth label="Display Name" value={name}
              onChange={(e) => setName(e.target.value)} required sx={{ mb: 2 }} placeholder="Your name" size="small" />
          )}
          <TextField fullWidth label="Password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required sx={{ mb: 3 }} placeholder="Min 6 characters" size="small" />
          <Button fullWidth type="submit" variant="contained" size="large" disabled={loading || !email || !password}
            sx={{ mb: 2, background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", "&:hover": { background: "linear-gradient(135deg,#a78bfa,#7c3aed)" } }}>
            {loading ? (tab === 0 ? "Signing in..." : "Creating account...") : (tab === 0 ? "Sign In" : "Create Account")}
          </Button>
          <Divider sx={{ my: 1 }} />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center" }}>
            Your data is stored securely in MongoDB
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
