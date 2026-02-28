"use client";

import { Box, Typography, Chip, Divider, Grid, LinearProgress } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { BusinessPlan } from "@/types";

interface Props { data: BusinessPlan; }

/* ─── helpers ─── */
function label(_color: string, text: string) {
  return (
    <Typography variant="caption" sx={{ display: "block", mb: 0.75, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", fontSize: "0.62rem", color: "text.secondary" }}>
      {text}
    </Typography>
  );
}

function SectionTitle({ icon, title, color, sub }: { icon: React.ReactNode; title: string; color: string; sub?: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
      <Box sx={{ width: 38, height: 38, borderRadius: 2, background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Box sx={{ color, display: "flex", fontSize: 20 }}>{icon}</Box>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight={800} sx={{ lineHeight: 1.2, letterSpacing: "-0.01em" }}>{title}</Typography>
        {sub && <Typography variant="caption" color="text.secondary">{sub}</Typography>}
      </Box>
    </Box>
  );
}

/* big coloured KPI card */

/* TAM → SAM → SOM funnel */
function MarketFunnel({ tam, sam, som }: { tam: string; sam: string; som: string }) {
  const rows = [
    { key: "TAM", raw: tam, color: "#06b6d4", pct: 100 },
    { key: "SAM", raw: sam, color: "#8b5cf6", pct: 30 },
    { key: "SOM", raw: som, color: "#10b981", pct: 8 },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
      {rows.map(({ key, raw, color, pct }) => {
        const [main, desc] = raw.split("—").map(s => s.trim());
        return (
          <Box key={key}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 28, height: 20, borderRadius: 0.75, background: `${color}20`, border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, color }}>{key}</Typography>
                </Box>
                <Typography variant="body2" fontWeight={700} sx={{ color }}>{main}</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.68rem" }}>{pct}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={pct} sx={{ height: 6, borderRadius: 3, bgcolor: `${color}12`, "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 3 } }} />
            {desc && <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.68rem", mt: 0.25, display: "block" }}>{desc}</Typography>}
          </Box>
        );
      })}
    </Box>
  );
}

/* Revenue stream row */
function StreamRow({ stream, model, price, projectedMonthly, index }: { stream: string; model: string; price: string; projectedMonthly: string; index: number }) {
  const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];
  const c = colors[index % colors.length];
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2, py: 1.5, background: index % 2 === 0 ? "rgba(255,255,255,0.025)" : "transparent", flexWrap: "wrap" }}>
      <Box sx={{ width: 3, height: 36, borderRadius: 4, background: c, flexShrink: 0 }} />
      <Box sx={{ flex: 1, minWidth: 120 }}>
        <Typography variant="body2" fontWeight={700} sx={{ fontSize: "0.82rem" }}>{stream}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
          <Box component="span" sx={{ textTransform: "capitalize" }}>{model}</Box> · {price}
        </Typography>
      </Box>
      <Chip label={projectedMonthly} size="small" sx={{ background: `${c}15`, color: c, border: `1px solid ${c}30`, fontWeight: 700, fontSize: "0.7rem" }} />
    </Box>
  );
}

/* P&L Year column */
function YearCard({ year, data, accent, stage }: { year: string; data: { revenue: string; expenses: string; netProfit: string; activeUsers: string; tvl: string }; accent: string; stage: string }) {
  const isProfit = !data.netProfit.trim().startsWith("-");
  const rows = [
    { l: "Revenue", v: data.revenue, bold: false },
    { l: "Expenses", v: data.expenses, bold: false },
    { l: "Net P&L", v: data.netProfit, bold: true },
    { l: "Active Users", v: data.activeUsers, bold: false },
    { l: "TVL", v: data.tvl, bold: false },
  ];
  return (
    <Box sx={{ flex: 1, minWidth: 160, borderRadius: 2.5, overflow: "hidden", border: `1px solid ${accent}25` }}>
      {/* Header */}
      <Box sx={{ px: 2, py: 1.5, background: `${accent}18`, borderBottom: `1px solid ${accent}20` }}>
        <Typography variant="overline" sx={{ color: accent, fontWeight: 800, fontSize: "0.62rem", letterSpacing: "0.1em", display: "block" }}>{year}</Typography>
        <Typography variant="caption" sx={{ color: `${accent}cc`, fontSize: "0.7rem" }}>{stage}</Typography>
      </Box>
      {/* Rows */}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {rows.map(({ l, v, bold }) => (
          <Box key={l} sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>{l}</Typography>
            <Typography variant="caption" fontWeight={bold ? 800 : 600} sx={{
              fontSize: bold ? "0.82rem" : "0.72rem",
              color: bold ? (isProfit ? "#10b981" : "#ef4444") : "text.primary",
            }}>{v}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* Unit econ metric with explain tooltip */
function EconMetric({ label: lbl, value, explain, color }: { label: string; value: string; explain?: string; color: string }) {
  const [main] = value.split("—");
  return (
    <Box sx={{ p: 2, borderRadius: 2, background: `${color}0d`, border: `1px solid ${color}22`, display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Typography variant="caption" sx={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "text.secondary" }}>{lbl}</Typography>
      <Typography variant="h6" fontWeight={900} sx={{ color, lineHeight: 1 }}>{main.trim()}</Typography>
      {explain && <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.68rem", lineHeight: 1.4 }}>{explain}</Typography>}
    </Box>
  );
}

export default function BusinessPlanCard({ data }: Props) {
  const { marketAnalysis: ma, businessModel: bm, financialProjections: fp } = data;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>

      {/* ══════════════════════════════════
          1. MARKET ANALYSIS
      ══════════════════════════════════ */}
      <Box>
        <SectionTitle
          icon={<TrendingUpIcon />}
          title="Market Analysis"
          color="#06b6d4"
          sub="TAM · SAM · SOM opportunity sizing"
        />

        {/* Funnel */}
        <Box sx={{ mb: 3, p: 2.5, borderRadius: 2.5, background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.15)" }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", fontSize: "0.62rem", display: "block", mb: 2 }}>
            Market Funnel
          </Typography>
          <MarketFunnel tam={ma.tam} sam={ma.sam} som={ma.som} />
        </Box>

        {/* Growth + Maturity */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2.5, borderRadius: 2, height: "100%", background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}>
              {label("#f59e0b", "Growth Rate")}
              <Typography variant="h6" fontWeight={800} sx={{ color: "#f59e0b", mb: 0.5 }}>
                {ma.growthRate.split("—")[0].trim()}
              </Typography>
              {ma.growthRate.includes("—") && (
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5, display: "block" }}>
                  {ma.growthRate.split("—")[1]?.trim()}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2.5, borderRadius: 2, height: "100%", background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)" }}>
              {label("#a78bfa", "Market Maturity")}
              <Typography variant="body2" fontWeight={700} sx={{ color: "#a78bfa", mb: 0.5 }}>
                {ma.marketMaturity.split("—")[0].trim()}
              </Typography>
              {ma.marketMaturity.includes("—") && (
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5, display: "block" }}>
                  {ma.marketMaturity.split("—")[1]?.trim()}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Key trends */}
        <Box>
          {label("#06b6d4", "Key Market Trends")}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {ma.keyTrends.map((t, i) => (
              <Box key={i} sx={{
                display: "flex", gap: 1.5, alignItems: "flex-start",
                p: 1.5, borderRadius: 2,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <Box sx={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, mt: 0.1 }}>
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: "#06b6d4" }}>{i + 1}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem", lineHeight: 1.6 }}>{t}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

      {/* ══════════════════════════════════
          2. BUSINESS MODEL
      ══════════════════════════════════ */}
      <Box>
        <SectionTitle
          icon={<AttachMoneyIcon />}
          title="Business Model — How We Win Money"
          color="#10b981"
          sub="Revenue architecture · Unit economics · Break-even"
        />

        {/* Primary revenue highlight */}
        <Box sx={{ mb: 3, p: 3, borderRadius: 2.5, background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.05) 100%)", border: "1px solid rgba(16,185,129,0.25)" }}>
          {label("#10b981", "Primary Revenue Engine")}
          <Typography variant="body1" sx={{ color: "#6ee7b7", fontWeight: 700, lineHeight: 1.7 }}>{bm.primaryRevenue}</Typography>
        </Box>

        {/* Secondary revenues */}
        {bm.secondaryRevenue?.length > 0 && (
          <Box sx={{ mb: 3 }}>
            {label("#10b981", "Additional Revenue Streams")}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              {bm.secondaryRevenue.map((s, i) => (
                <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", p: 1.5, borderRadius: 2, background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)" }}>
                  <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#10b981", mt: 0.1, flexShrink: 0 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem", lineHeight: 1.5 }}>{s}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Revenue stream table */}
        {bm.revenueStreams?.length > 0 && (
          <Box sx={{ mb: 3 }}>
            {label("#10b981", "Revenue Stream Breakdown")}
            <Box sx={{ borderRadius: 2.5, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              {/* Table header */}
              <Box sx={{ display: "flex", px: 2, py: 1, background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Stream", "Model · Price", "Projected Monthly"].map(h => (
                  <Typography key={h} variant="caption" sx={{ flex: h === "Stream" ? 1.5 : 1, fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.secondary" }}>{h}</Typography>
                ))}
              </Box>
              {bm.revenueStreams.map((rs, i) => (
                <StreamRow key={i} {...rs} index={i} />
              ))}
            </Box>
          </Box>
        )}

        {/* Unit economics grid */}
        <Box sx={{ mb: 3 }}>
          {label("#10b981", "Unit Economics")}
          <Grid container spacing={1.5}>
            {[
              { label: "CAC", value: bm.unitEconomics.cac, color: "#f59e0b", explain: "Cost to acquire one user" },
              { label: "LTV", value: bm.unitEconomics.ltv, color: "#10b981", explain: "Lifetime value per user" },
              { label: "LTV : CAC", value: bm.unitEconomics.ltvCacRatio, color: "#8b5cf6", explain: "Healthy if > 3:1" },
              { label: "Payback", value: `${bm.unitEconomics.paybackPeriodMonths} months`, color: "#06b6d4", explain: "Time to recover CAC" },
              { label: "Gross Margin", value: bm.unitEconomics.grossMargin, color: "#ec4899", explain: "Revenue minus variable cost" },
            ].map(m => (
              <Grid item xs={6} sm={4} key={m.label}>
                <EconMetric {...m} />
              </Grid>
            ))}
          </Grid>

          {/* LTV:CAC health gauge */}
          {(() => {
            const ratio = parseFloat(bm.unitEconomics.ltvCacRatio);
            const pct = Math.min(100, (ratio / 15) * 100);
            const barColor = ratio >= 5 ? "#10b981" : ratio >= 3 ? "#f59e0b" : "#ef4444";
            const health = ratio >= 5 ? "Excellent" : ratio >= 3 ? "Healthy" : "Below target";
            return !isNaN(ratio) ? (
              <Box sx={{ mt: 2, p: 2, borderRadius: 2, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>LTV:CAC Health — <Box component="span" sx={{ color: barColor, fontWeight: 700 }}>{health}</Box></Typography>
                  <Typography variant="caption" sx={{ color: barColor, fontWeight: 700, fontSize: "0.72rem" }}>{ratio.toFixed(1)}:1</Typography>
                </Box>
                <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 4, bgcolor: "rgba(255,255,255,0.06)", "& .MuiLinearProgress-bar": { bgcolor: barColor, borderRadius: 4 } }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.62rem" }}>0</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.62rem" }}>Target ≥ 3:1</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.62rem" }}>15+</Typography>
                </Box>
              </Box>
            ) : null;
          })()}
        </Box>

        {/* Break-even */}
        <Box sx={{ p: 2.5, borderRadius: 2.5, background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.22)" }}>
          {label("#f59e0b", "Break-Even Analysis")}
          <Typography variant="body2" sx={{ color: "#fcd34d", lineHeight: 1.7, fontSize: "0.85rem" }}>{bm.breakEvenAnalysis}</Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

      {/* ══════════════════════════════════
          3. FINANCIAL PROJECTIONS
      ══════════════════════════════════ */}
      <Box>
        <SectionTitle
          icon={<ShowChartIcon />}
          title="Financial Projections"
          color="#8b5cf6"
          sub="3-year P&L · User growth · TVL trajectory"
        />

        {/* Year columns */}
        <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
          <YearCard year="Year 1" data={fp.year1} accent="#ef4444" stage="Investment Phase" />
          <YearCard year="Year 2" data={fp.year2} accent="#f59e0b" stage="Break-Even Zone" />
          <YearCard year="Year 3" data={fp.year3} accent="#10b981" stage="Profitability" />
        </Box>

        {/* Revenue growth visual bars */}
        <Box sx={{ mb: 3, p: 2.5, borderRadius: 2.5, background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)" }}>
          {label("#8b5cf6", "Revenue Growth Trajectory")}
          {[
            { yr: "Y1", rev: fp.year1.revenue, pct: 10, color: "#ef4444" },
            { yr: "Y2", rev: fp.year2.revenue, pct: 40, color: "#f59e0b" },
            { yr: "Y3", rev: fp.year3.revenue, pct: 100, color: "#10b981" },
          ].map(({ yr, rev, pct, color }) => (
            <Box key={yr} sx={{ mb: 1.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color, fontSize: "0.72rem" }}>{yr}</Typography>
                <Typography variant="caption" sx={{ fontWeight: 700, color, fontSize: "0.72rem" }}>{rev}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={pct} sx={{ height: 10, borderRadius: 5, bgcolor: "rgba(255,255,255,0.06)", "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 5 } }} />
            </Box>
          ))}
        </Box>

        {/* Funding needed */}
        <Box sx={{ mb: 3, p: 2.5, borderRadius: 2.5, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)" }}>
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
            <AccountBalanceWalletIcon sx={{ color: "#a78bfa", fontSize: 22, mt: 0.25, flexShrink: 0 }} />
            <Box>
              {label("#a78bfa", "Funding Required to Profitability")}
              <Typography variant="body2" sx={{ color: "#c4b5fd", fontWeight: 600, lineHeight: 1.7, fontSize: "0.85rem" }}>{fp.fundingNeeded}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Key assumptions */}
        <Box>
          {label("#8b5cf6", "Key Assumptions")}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {fp.keyAssumptions.map((a, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", p: 1.75, borderRadius: 2, background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.12)" }}>
                <Box sx={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: 900, color: "#a78bfa" }}>{i + 1}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem", lineHeight: 1.6 }}>{a}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
