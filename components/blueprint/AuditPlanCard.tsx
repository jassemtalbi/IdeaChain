"use client";

import { useState } from "react";
import {
  Box, Typography, Chip, Stack, Divider, Grid, LinearProgress, Avatar,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  Radio, RadioGroup, FormControlLabel, Alert,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import { AuditPlan, AuditFirm } from "@/types";

interface Props { data: AuditPlan; }

const SEV_COLOR: Record<string, string> = {
  Critical: "#dc2626", High: "#ea580c", Medium: "#d97706", Low: "#059669",
};
const SEV_BG: Record<string, string> = {
  Critical: "rgba(220,38,38,0.07)", High: "rgba(234,88,12,0.07)",
  Medium: "rgba(217,119,6,0.07)", Low: "rgba(5,150,105,0.07)",
};
const TIER_COLOR: Record<string, string> = {
  "Top-tier": "#7c3aed", "Mid-tier": "#0891b2", Specialized: "#059669",
};
const RISK_PCT: Record<string, number> = { Critical: 100, High: 75, Medium: 45, Low: 20 };
const RISK_BAR_COLOR: Record<string, string> = {
  Critical: "#dc2626", High: "#ea580c", Medium: "#d97706", Low: "#059669",
};

// ── Payment Modal ─────────────────────────────────────────────────────────
function PaymentModal({
  open, firm, onClose, onPaid,
}: {
  open: boolean;
  firm: AuditFirm | null;
  onClose: () => void;
  onPaid: () => void;
}) {
  const [method, setMethod] = useState<"crypto" | "card">("crypto");
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    setPaid(true);
    setTimeout(() => { onPaid(); onClose(); setPaid(false); }, 1800);
  };

  if (!firm) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PaymentIcon sx={{ color: "#7c3aed", fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight={700}>Request Audit</Typography>
        </Box>
        <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
      </DialogTitle>

      <DialogContent>
        {paid ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 56, color: "#059669", mb: 1.5 }} />
            <Typography variant="h6" fontWeight={700}>Request Sent!</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              {firm.name} will contact you within 24–48 hours to begin the engagement.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Firm summary */}
            <Box sx={{
              p: 2, borderRadius: 2, mb: 2,
              background: `${TIER_COLOR[firm.tier]}08`,
              border: `1px solid ${TIER_COLOR[firm.tier]}20`,
              display: "flex", alignItems: "center", gap: 1.5,
            }}>
              <Avatar sx={{ width: 40, height: 40, fontSize: "0.75rem", fontWeight: 800, background: `linear-gradient(135deg, ${TIER_COLOR[firm.tier]}, ${TIER_COLOR[firm.tier]}99)` }}>
                {firm.name.slice(0, 2).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight={700}>{firm.name}</Typography>
                <Typography variant="caption" color="text.secondary">{firm.specialty}</Typography>
              </Box>
            </Box>

            {/* Cost + turnaround */}
            <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
              <Box sx={{ flex: 1, p: 1.5, borderRadius: 2, background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.12)", textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.25 }}>Estimated Cost</Typography>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#7c3aed" }}>{firm.estimatedCost}</Typography>
              </Box>
              <Box sx={{ flex: 1, p: 1.5, borderRadius: 2, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.07)", textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.25 }}>Turnaround</Typography>
                <Typography variant="subtitle2" fontWeight={700}>{firm.turnaround}</Typography>
              </Box>
            </Box>

            {/* Payment method selector */}
            <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: "block", mb: 1, letterSpacing: "0.05em" }}>
              PAYMENT METHOD
            </Typography>
            <RadioGroup value={method} onChange={(e) => setMethod(e.target.value as "crypto" | "card")}>
              <Box sx={{ display: "flex", gap: 1 }}>
                {(["crypto", "card"] as const).map((m) => (
                  <Box
                    key={m}
                    onClick={() => setMethod(m)}
                    sx={{
                      flex: 1, p: 1.5, borderRadius: 2, cursor: "pointer",
                      border: `1.5px solid ${method === m ? "#7c3aed" : "rgba(0,0,0,0.1)"}`,
                      background: method === m ? "rgba(124,58,237,0.05)" : "#fff",
                      transition: "all 0.15s",
                    }}
                  >
                    <FormControlLabel
                      value={m}
                      control={<Radio size="small" sx={{ color: "#7c3aed", "&.Mui-checked": { color: "#7c3aed" }, p: 0.5 }} />}
                      label={<Typography variant="body2" fontWeight={600}>{m === "crypto" ? "Crypto (ETH/USDC)" : "Credit Card"}</Typography>}
                      sx={{ m: 0, gap: 0.5 }}
                    />
                  </Box>
                ))}
              </Box>
            </RadioGroup>

            <Alert severity="info" sx={{ mt: 2, fontSize: "0.72rem", borderRadius: 2, py: 0.5 }}>
              {method === "crypto"
                ? "Secure wallet-connect checkout. Payment held in escrow until audit starts."
                : "Stripe-secured checkout. Invoice issued within 24h upon confirmation."}
            </Alert>
          </>
        )}
      </DialogContent>

      {!paid && (
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 0 }}>
          <Button onClick={onClose} variant="outlined" size="small" sx={{ borderRadius: 2, color: "text.secondary", borderColor: "rgba(0,0,0,0.15)" }}>
            Cancel
          </Button>
          <Button
            onClick={handlePay}
            variant="contained"
            size="small"
            startIcon={<PaymentIcon sx={{ fontSize: 15 }} />}
            sx={{
              borderRadius: 2, fontWeight: 700,
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              boxShadow: "0 2px 12px rgba(124,58,237,0.3)",
              "&:hover": { background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" },
            }}
          >
            Confirm &amp; Pay
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

// ── Main Card ─────────────────────────────────────────────────────────────
export default function AuditPlanCard({ data }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [payModalFirm, setPayModalFirm] = useState<AuditFirm | null>(null);
  const [hiredFirm, setHiredFirm] = useState<string | null>(null);

  const riskPct = RISK_PCT[data.riskLevel] ?? 45;
  const riskColor = RISK_BAR_COLOR[data.riskLevel] ?? "#d97706";

  return (
    <Box sx={{ position: "relative" }}>
      {/* ── Content (blurred when locked) ────────────────────────── */}
      <Box sx={{
        filter: unlocked ? "none" : "blur(6px) brightness(0.97)",
        transition: "filter 0.5s ease",
        pointerEvents: unlocked ? "auto" : "none",
        userSelect: unlocked ? "auto" : "none",
      }}>

        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <VerifiedUserIcon sx={{ color: "#7c3aed" }} />
          <Typography variant="h6" fontWeight={700}>Smart Contract Audit Plan</Typography>
          <Chip
            label={`${data.riskLevel} Risk`} size="small"
            sx={{ ml: "auto", background: SEV_BG[data.riskLevel], color: SEV_COLOR[data.riskLevel], border: `1px solid ${SEV_COLOR[data.riskLevel]}30`, fontWeight: 700, fontSize: "0.7rem" }}
          />
        </Box>

        {/* Summary + budget + risk bar */}
        <Box sx={{ p: 2, borderRadius: 2, background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.12)", mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1.5 }}>{data.summary}</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Estimated Budget</Typography>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#7c3aed" }}>{data.estimatedBudget}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Risk Exposure</Typography>
                <Typography variant="caption" fontWeight={700} sx={{ color: riskColor }}>{data.riskLevel}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={riskPct} sx={{ height: 6, borderRadius: 3, backgroundColor: "rgba(0,0,0,0.06)", "& .MuiLinearProgress-bar": { background: riskColor, borderRadius: 3 } }} />
            </Box>
          </Box>
        </Box>

        {/* Audit Phases */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <AccountTreeIcon sx={{ fontSize: 15, color: "text.secondary" }} />
            <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ letterSpacing: "0.06em" }}>AUDIT PHASES</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0, alignItems: "center" }}>
            {data.auditPhases.map((phase, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ px: 1.5, py: 0.6, borderRadius: 2, background: i === 0 ? "rgba(124,58,237,0.1)" : "rgba(0,0,0,0.04)", border: `1px solid ${i === 0 ? "rgba(124,58,237,0.25)" : "rgba(0,0,0,0.08)"}` }}>
                  <Typography variant="caption" fontWeight={600} sx={{ color: i === 0 ? "#7c3aed" : "text.secondary" }}>{i + 1}. {phase}</Typography>
                </Box>
                {i < data.auditPhases.length - 1 && <Typography variant="caption" color="text.secondary" sx={{ mx: 0.75 }}>→</Typography>}
              </Box>
            ))}
          </Box>
        </Box>

        {/* OZ Libraries */}
        {data.openZeppelinLibraries.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.25 }}>
              <Box sx={{ width: 14, height: 14, borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography sx={{ fontSize: "0.5rem", color: "#fff", fontWeight: 900, lineHeight: 1 }}>OZ</Typography>
              </Box>
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ letterSpacing: "0.06em" }}>OPENZEPPELIN LIBRARIES</Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {data.openZeppelinLibraries.map((lib) => (
                <Chip key={lib} label={lib} size="small" sx={{ fontFamily: "monospace", fontSize: "0.68rem", background: "rgba(79,70,229,0.08)", color: "#4f46e5", border: "1px solid rgba(79,70,229,0.2)", height: 22 }} />
              ))}
            </Box>
          </Box>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* Checklist */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 2 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 15, color: "text.secondary" }} />
            <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ letterSpacing: "0.06em" }}>
              AUDIT CHECKLIST ({data.checklist.length} items)
            </Typography>
          </Box>
          <Stack spacing={1.5}>
            {data.checklist.map((item, i) => (
              <Box key={i} sx={{ p: 2, borderRadius: 2, background: SEV_BG[item.severity], border: `1px solid ${SEV_COLOR[item.severity]}20`, borderLeft: `3px solid ${SEV_COLOR[item.severity]}` }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75, flexWrap: "wrap" }}>
                  <WarningAmberIcon sx={{ fontSize: 13, color: SEV_COLOR[item.severity] }} />
                  <Typography variant="caption" fontWeight={700} sx={{ color: SEV_COLOR[item.severity], fontSize: "0.65rem", letterSpacing: "0.05em" }}>
                    {item.severity.toUpperCase()}
                  </Typography>
                  <Typography variant="caption" fontWeight={700} color="text.primary" sx={{ ml: 0.5 }}>{item.category}</Typography>
                  {item.openZeppelinModule && (
                    <Chip label={`OZ: ${item.openZeppelinModule}`} size="small" sx={{ ml: "auto", fontFamily: "monospace", fontSize: "0.58rem", height: 18, background: "rgba(79,70,229,0.1)", color: "#4f46e5" }} />
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.75, lineHeight: 1.6 }}>{item.description}</Typography>
                <Box sx={{ display: "flex", gap: 0.5, alignItems: "flex-start" }}>
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", mt: 0.75, flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ color: "#059669", lineHeight: 1.6, fontWeight: 500 }}>{item.recommendation}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Hire an Auditor */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 2 }}>
            <GroupsIcon sx={{ fontSize: 15, color: "text.secondary" }} />
            <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ letterSpacing: "0.06em" }}>
              CHOOSE &amp; HIRE AN AUDITOR
            </Typography>
          </Box>
          <Grid container spacing={1.5}>
            {data.recommendedFirms.map((firm) => {
              const isHired = hiredFirm === firm.name;
              return (
                <Grid item xs={12} sm={6} key={firm.name}>
                  <Box sx={{
                    p: 2, borderRadius: 2,
                    background: isHired ? `${TIER_COLOR[firm.tier]}06` : "#ffffff",
                    border: isHired ? `1.5px solid ${TIER_COLOR[firm.tier]}45` : "1px solid rgba(124,58,237,0.1)",
                    boxShadow: isHired ? `0 4px 20px ${TIER_COLOR[firm.tier]}15` : "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.2s",
                    height: "100%", display: "flex", flexDirection: "column",
                  }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.25 }}>
                      <Avatar sx={{ width: 36, height: 36, fontSize: "0.75rem", fontWeight: 800, background: `linear-gradient(135deg, ${TIER_COLOR[firm.tier]}, ${TIER_COLOR[firm.tier]}99)` }}>
                        {firm.name.slice(0, 2).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
                          <Typography variant="subtitle2" fontWeight={700} noWrap>{firm.name}</Typography>
                          <Chip label={firm.tier} size="small" sx={{ fontSize: "0.58rem", height: 18, fontWeight: 700, background: `${TIER_COLOR[firm.tier]}12`, color: TIER_COLOR[firm.tier], border: `1px solid ${TIER_COLOR[firm.tier]}30` }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary">{firm.specialty}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.6rem" }}>COST</Typography>
                        <Typography variant="caption" fontWeight={700} sx={{ color: "#7c3aed" }}>{firm.estimatedCost}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.6rem" }}>TURNAROUND</Typography>
                        <Typography variant="caption" fontWeight={700} color="text.primary">{firm.turnaround}</Typography>
                      </Box>
                    </Box>

                    <Box component="a" href={firm.website} target="_blank" rel="noopener noreferrer"
                      sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, fontSize: "0.68rem", fontWeight: 600, color: "#0891b2", textDecoration: "none", mb: 1.5, "&:hover": { textDecoration: "underline" } }}>
                      Visit website <OpenInNewIcon sx={{ fontSize: 11 }} />
                    </Box>

                    <Box sx={{ mt: "auto" }}>
                      {isHired ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, px: 1.5, py: 1, borderRadius: 2, background: `${TIER_COLOR[firm.tier]}10`, border: `1px solid ${TIER_COLOR[firm.tier]}25` }}>
                          <CheckCircleIcon sx={{ fontSize: 15, color: TIER_COLOR[firm.tier] }} />
                          <Typography variant="caption" fontWeight={700} sx={{ color: TIER_COLOR[firm.tier] }}>
                            Request sent — awaiting contact
                          </Typography>
                        </Box>
                      ) : (
                        <Button
                          fullWidth variant="outlined" size="small"
                          startIcon={<PaymentIcon sx={{ fontSize: 14 }} />}
                          onClick={() => setPayModalFirm(firm)}
                          sx={{
                            borderRadius: 2, fontWeight: 700, fontSize: "0.78rem",
                            borderColor: `${TIER_COLOR[firm.tier]}40`,
                            color: TIER_COLOR[firm.tier],
                            "&:hover": { borderColor: TIER_COLOR[firm.tier], background: `${TIER_COLOR[firm.tier]}08` },
                          }}
                        >
                          Hire &amp; Pay
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      {/* ── Lock overlay (sits on top of blurred content) ──────────── */}
      {!unlocked && (
        <Box sx={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: 3,
          // Gradient vignette so edges are more faded
          background: "linear-gradient(180deg, rgba(248,249,255,0.25) 0%, rgba(248,249,255,0.55) 40%, rgba(248,249,255,0.82) 100%)",
        }}>
          <Box sx={{
            textAlign: "center", p: { xs: 3, sm: 4 },
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(124,58,237,0.18)",
            borderRadius: 3,
            boxShadow: "0 12px 48px rgba(124,58,237,0.14), 0 2px 8px rgba(0,0,0,0.06)",
            maxWidth: 300, mx: 2,
          }}>
            {/* Lock icon circle */}
            <Box sx={{
              width: 60, height: 60, borderRadius: "50%", mx: "auto", mb: 2,
              background: "linear-gradient(135deg, #7c3aed18, #0891b210)",
              border: "1.5px solid rgba(124,58,237,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(124,58,237,0.12)",
            }}>
              <LockIcon sx={{ fontSize: 28, color: "#7c3aed" }} />
            </Box>

            <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 0.75, letterSpacing: "-0.01em" }}>
              Audit Plan Locked
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.65, fontSize: "0.82rem" }}>
              Unlock the full security checklist, OZ library stack, and direct auditor hiring with payment.
            </Typography>

            {/* Preview chips */}
            <Box sx={{ display: "flex", gap: 0.75, mb: 2.5, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { label: `${data.checklist.length} checks`, color: "#7c3aed" },
                { label: `${data.recommendedFirms.length} firms`, color: "#0891b2" },
                { label: `${data.riskLevel} risk`, color: riskColor },
              ].map((item) => (
                <Box key={item.label} sx={{ px: 1.25, py: 0.35, borderRadius: 10, background: `${item.color}10`, border: `1px solid ${item.color}28` }}>
                  <Typography variant="caption" fontWeight={700} sx={{ color: item.color, fontSize: "0.68rem" }}>{item.label}</Typography>
                </Box>
              ))}
            </Box>

            <Button
              fullWidth variant="contained"
              onClick={() => setUnlocked(true)}
              sx={{
                borderRadius: 2.5, fontWeight: 700, py: 1.25, fontSize: "0.875rem",
                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                letterSpacing: "0.01em",
                "&:hover": {
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  boxShadow: "0 6px 28px rgba(124,58,237,0.5)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s",
              }}
            >
              🔓 Unlock Audit Plan
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.25, fontSize: "0.66rem" }}>
              One-time unlock · Full checklist + auditor payment
            </Typography>
          </Box>
        </Box>
      )}

      {/* Payment modal */}
      <PaymentModal
        open={!!payModalFirm}
        firm={payModalFirm}
        onClose={() => setPayModalFirm(null)}
        onPaid={() => { if (payModalFirm) setHiredFirm(payModalFirm.name); }}
      />
    </Box>
  );
}
