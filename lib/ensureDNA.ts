import { Blueprint, IdeaDNA, NFTMetadata } from "@/types";

function hashIdea(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h = ((h ^ text.charCodeAt(i)) * 0x01000193) >>> 0;
  }
  return "0x" + h.toString(16).padStart(8, "0") + (h ^ 0xdeadbeef).toString(16).padStart(4, "0");
}

export function ensureBlueprintDNA(blueprint: Blueprint, rawIdea: string): Blueprint {
  const b = { ...blueprint };

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
