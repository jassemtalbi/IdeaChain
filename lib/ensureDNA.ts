import { Blueprint, IdeaDNA, NFTMetadata, BusinessPlan } from "@/types";

function hashIdea(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h = ((h ^ text.charCodeAt(i)) * 0x01000193) >>> 0;
  }
  return "0x" + h.toString(16).padStart(8, "0") + (h ^ 0xdeadbeef).toString(16).padStart(4, "0");
}

function synthesizeBusinessPlan(blueprint: Blueprint, rawIdea: string): BusinessPlan {
  const tm = (blueprint.tokenModel || {}) as any;
  const rs = (blueprint.readinessScore || {}) as any;
  const ca = (blueprint.competitorAnalysis || {}) as any;
  const gtm = (blueprint.goToMarket || {}) as any;
  const sc = (blueprint.smartContracts || {}) as any;
  const bc = (blueprint.recommendedBlockchain || {}) as any;

  const factors: any[] = rs.factors || [];
  const phases: any[] = gtm.phases || [];
  const fundraising: any[] = tm.fundraisingRounds || [];
  const tvlMatches = (rs.tvlProjection || "").match(/\$[\d.]+[MKB]+/g) || [];

  const f = (label: string) => factors.find((x: any) => x.label?.toLowerCase().includes(label.toLowerCase()))?.note || "";

  const phase1 = phases[0];
  const phase2 = phases[1];
  const phase3 = phases[2];
  const topComp = ca.competitors?.[0];

  return {
    marketAnalysis: {
      tam: rs.marketSize ? `${rs.marketSize} — ${f("Market Size") || "large addressable market"}` : `Global ${rawIdea.split(" ").slice(0, 3).join(" ")} market`,
      sam: `Web3-ready segment of the ${rs.marketSize?.split(",")[0] || "total"} market. ${f("Web3 Disruption") || f("disruption") || "Web3 removes intermediaries and unlocks new value for participants."}`,
      som: `24-month target: ${tvlMatches[1] || tvlMatches[0] || "scaling TVL"}. ${phase3?.kpis?.[0] || phase2?.kpis?.[0] || "Based on phased go-to-market plan."}`,
      growthRate: `Readiness score ${rs.overall}/10. ${f("Market Size") || f("Community") || "Market growing with Web3 adoption."}`,
      keyTrends: [
        f("Community Potential") || f("Community") || ca.moat?.slice(0, 140) || `Community-driven protocols are outpacing centralized incumbents in this sector`,
        f("Web3 Disruption Potential") || f("Disruption") || `Web3 primitives directly address ${topComp ? topComp.web2Model?.slice(0, 100) : "core pain points of existing platforms"}`,
        f("Regulatory Clarity") || f("Regulatory") || `Regulatory clarity is improving — early compliance positioning creates durable competitive advantage`,
      ].map((s: string) => s.slice(0, 200)),
      marketMaturity: `${rs.overall >= 8 ? "Growing" : "Emerging"} — ${ca.marketShare || ca.moat?.slice(0, 100) || "fragmented incumbents with no dominant Web3 competitor"}`,
    },
    businessModel: {
      primaryRevenue: tm.revenueModel || `${tm.symbol || "Token"} protocol fees fund treasury and staking rewards`,
      secondaryRevenue: [
        tm.burnMechanism ? `Deflationary burn: ${tm.burnMechanism}` : `Token burn on protocol activity reduces circulating supply`,
        tm.stakingYield ? `Staking yield: ${tm.stakingYield}` : `Staking rewards distributed from protocol fee pool`,
        phase3?.kpis?.length ? `Phase 3 target: ${phase3.kpis.slice(0, 2).join(" · ")}` : `Enterprise/API revenue layer post-mainnet`,
      ],
      unitEconomics: {
        cac: phase1?.budget ? `Phase 1 budget ${phase1.budget} for ${phase1.kpis?.[0] || "early community"} — cost per user scales down with referrals` : `Community airdrop + referral program — low CAC via token incentives`,
        ltv: `${tm.stakingYield || "Staking yield"} + ${tm.revenueModel?.slice(0, 60) || "protocol fees"} — user LTV compounds with token price appreciation`,
        ltvCacRatio: `Target >5:1 — ${bc.primary ? `${bc.gasEstimate || "low gas"} on ${bc.primary}` : "L2 gas costs"} keep marginal transaction cost near zero`,
        paybackPeriodMonths: phase1 ? 3 : 6,
        grossMargin: `85–95% — pure protocol software on ${bc.primary || "L2 blockchain"} with ${sc.auditBudget ? sc.auditBudget + " audit cost" : "minimal fixed infrastructure costs"}`,
      },
      revenueStreams: phases.map((p: any, i: number) => ({
        stream: p.title,
        model: i === 0 ? "community/bootstrap" : i === 1 ? "protocol fees" : "subscription/enterprise",
        price: p.budget || "DAO-governed",
        projectedMonthly: p.kpis?.[p.kpis.length - 1] || `${p.duration} target`,
      })),
      breakEvenAnalysis: phase3
        ? `${phase3.title} (${phase3.duration}): ${phase3.kpis?.join(" · ") || "mainnet launch targets"}. Budget: ${phase3.budget || "N/A"}.`
        : `Break-even at mainnet launch — ${rs.tvlProjection || "TVL growth drives protocol fee revenue"}`,
    },
    financialProjections: {
      year1: {
        revenue: fundraising[0]?.raise ? `${fundraising[0].raise} raised (${fundraising[0].round})` : phase1?.budget || "Pre-revenue / seed phase",
        expenses: [phase1?.budget, phase2?.budget].filter(Boolean).join(" + ") || "Development + audit + community bootstrap",
        netProfit: `-${phase1?.budget || "seed investment"} (investment phase — no protocol revenue yet)`,
        activeUsers: phase2?.kpis?.[0] || phase1?.kpis?.[0] || "Testnet + early community members",
        tvl: tvlMatches[0] || "Bootstrapping liquidity pools",
      },
      year2: {
        revenue: fundraising[1]?.raise ? `${fundraising[1].raise} raised (${fundraising[1].round}) + growing protocol fees` : `Protocol fees ramping + ${tm.stakingYield || "staking rewards"}`,
        expenses: phase3?.budget ? `~${phase3.budget}/year — marketing, liquidity, ops` : "Team + liquidity + partnerships",
        netProfit: `Break-even zone — ${phase3?.kpis?.[0] || tvlMatches[1] ? `TVL target: ${tvlMatches[1]}` : "fee revenue covering operating costs"}`,
        activeUsers: phase3?.kpis?.find((k: string) => k.toLowerCase().includes("wallet") || k.toLowerCase().includes("user")) || phase3?.kpis?.[1] || "Post-mainnet growth",
        tvl: tvlMatches[1] || tvlMatches[0] ? `${tvlMatches[0]} → ${tvlMatches[1] || "scaling"}` : rs.tvlProjection || "Growing",
      },
      year3: {
        revenue: `${tm.revenueModel?.slice(0, 80) || "Protocol fees"} at full scale — sustainable revenue from active ecosystem`,
        expenses: "Core team + DAO-governed grants + infrastructure (declining % of revenue)",
        netProfit: `Profitable — ${tm.stakingYield ? tm.stakingYield + " to stakers" : "surplus to DAO treasury"} + ${tm.burnMechanism ? "ongoing " + tm.burnMechanism : "token buybacks"}`,
        activeUsers: `${topComp ? `Capturing share from ${topComp.name} (${topComp.monthlyActiveUsers || "large MAU base"})` : "10× Year 2 active wallets"} — ${ca.moat?.slice(0, 60) || "network effects compounding"}`,
        tvl: ca.web3Competitors?.[0]?.tvl ? `Targeting 2–5× ${ca.web3Competitors[0].name}'s ${ca.web3Competitors[0].tvl} — differentiated by ${ca.web3Competitors[0].differentiator?.slice(0, 60)}` : "Category leadership TVL",
      },
      keyAssumptions: [
        fundraising.length ? `Fundraising: ${fundraising.map((r: any) => `${r.round} ${r.raise} @ ${r.valuation}`).join(" → ")}` : `Token: ${tm.symbol} at ${tm.initialPrice || "seed price"}, FDV ${tm.fullyDilutedValuation || "at launch"}`,
        phase3?.kpis?.join(" · ") || `Phase 3 mainnet KPIs drive Year 2 revenue projections`,
        topComp ? `Key conversion target: ${topComp.name} users via ${topComp.yourEdge || "superior tokenomics and lower fees"}` : `Community-led growth via ${gtm.launchStrategy || "IDO and liquidity mining"}`,
      ],
      fundingNeeded: fundraising.length
        ? `${fundraising.map((r: any) => `${r.round}: ${r.raise} @ ${r.valuation} valuation (${r.tokenPrice}/token)`).join(" → ")}. Audit: ${sc.auditBudget || "TBD"}.`
        : `Seed + public round per tokenomics. Audit: ${sc.auditBudget || "budget via DAO governance"}.`,
    },
  };
}

export function ensureBlueprintDNA(blueprint: Blueprint, rawIdea: string): Blueprint {
  const b = { ...blueprint };

  if (!b.businessPlan || !b.businessPlan.marketAnalysis || !b.businessPlan.financialProjections) {
    b.businessPlan = synthesizeBusinessPlan(b, rawIdea);
  }

  if (!b.ideaDNA || !Array.isArray(b.ideaDNA.components) || b.ideaDNA.components.length < 7) {
    const wp = b.whitepaper || ({} as any);
    const tm = b.tokenModel || ({} as any);
    const ca = b.competitorAnalysis || ({} as any);
    const rs = b.readinessScore || ({} as any);
    const gtm = b.goToMarket || ({} as any);

    const seg0 = Array.isArray(gtm.targetSegments) && gtm.targetSegments[0];
    const targetMarket = seg0
      ? typeof seg0 === "string"
        ? seg0
        : `${seg0.segment || ""}${seg0.size ? ` (${seg0.size})` : ""}`
      : "Global users seeking decentralized alternatives to traditional platforms.";

    const communityFactor = (rs.factors || []).find((f: any) => f.label === "Community Potential");

    const components: IdeaDNA["components"] = [
      {
        label: "Problem",
        value: trim120(wp.problem) || "Centralized platforms extract high fees with no community ownership.",
        weight: 9,
      },
      {
        label: "Solution",
        value: trim120(wp.solution) || "Smart contracts automate value distribution directly to participants.",
        weight: 8,
      },
      { label: "Target Market", value: targetMarket.slice(0, 120), weight: 7 },
      {
        label: "Revenue Model",
        value: trim120(tm.revenueModel) || "Protocol fees distributed to token stakers and burned to reduce supply.",
        weight: 8,
      },
      {
        label: "Moat",
        value: trim120(ca.moat) || "Network effects and on-chain reputation create strong switching costs.",
        weight: 7,
      },
      {
        label: "Token Utility",
        value: tm.stakingYield
          ? `${tm.symbol || "Token"} required for protocol access, governance voting, and staking for ${tm.stakingYield}.`
          : "Native token required for all protocol interactions, governance, and fee discounts.",
        weight: 9,
      },
      {
        label: "Network Effect",
        value: trim120(communityFactor?.note) || "Each new participant increases protocol liquidity and data value for all users.",
        weight: 8,
      },
    ];

    const fingerprint = hashIdea(rawIdea + (tm.symbol || ""));
    const uniquenessScore = Math.min(95, Math.max(45, Math.round((rs.overall || 7) * 9)));

    b.ideaDNA = { components, fingerprint, uniquenessScore };
  }

  if (!b.nftMetadata || !b.nftMetadata.contract) {
    const seed = hashIdea(rawIdea).replace("0x", "");
    const contract = "0x" + (seed.repeat(5)).slice(0, 40);
    const tokenNum = 1000 + (parseInt(seed.slice(0, 4), 16) % 9000);
    const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";
    const seedNum = parseInt(seed, 16) || 1;
    let ipfsHash = "Qm";
    for (let i = 0; i < 44; i++) {
      ipfsHash += CHARS[(seedNum * (i + 1) * 7919) % CHARS.length];
    }

    const nft: NFTMetadata = {
      tokenId: `#${tokenNum}`,
      standard: "ERC-721",
      contract,
      royaltyPercent: 5 + (parseInt(seed.slice(0, 2), 16) % 6),
      metadataURI: `ipfs://${ipfsHash}`,
    };
    b.nftMetadata = nft;
  }

  return b;
}

function trim120(s?: string): string {
  if (!s) return "";
  const trimmed = s.slice(0, 120);
  // cut at last complete word
  return trimmed.replace(/\s+\S*$/, "").trim();
}
