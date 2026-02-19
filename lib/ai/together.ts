import { Blueprint } from "@/types";
import { MOCK_BLUEPRINT_EDUCHAIN } from "../mock/blueprints";

const TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions";

const SYSTEM_PROMPT = `You are an expert Web3 architect and tokenomics designer. When given a Web2 startup idea, you return a comprehensive Web3 transformation blueprint as structured JSON.

You must return ONLY valid JSON matching this exact schema (no text outside JSON):
{
  "tags": ["string array of 3-5 Web3 sector tags like DeFi, NFT, DAO, GameFi, RWA, SocialFi, EdTech, etc."],
  "tokenModel": {
    "name": "Token Name",
    "symbol": "SYM",
    "totalSupply": "100,000,000",
    "vestingSchedule": {
      "founders": { "percentage": 15, "cliffMonths": 12, "vestingMonths": 36 },
      "community": { "percentage": 40, "cliffMonths": 0, "vestingMonths": 48 },
      "treasury": { "percentage": 30, "cliffMonths": 6, "vestingMonths": 24 },
      "team": { "percentage": 15, "cliffMonths": 12, "vestingMonths": 24 }
    },
    "distribution": [
      { "label": "Community", "percentage": 40, "color": "#8b5cf6" },
      { "label": "Treasury", "percentage": 30, "color": "#06b6d4" },
      { "label": "Founders", "percentage": 15, "color": "#ec4899" },
      { "label": "Team", "percentage": 15, "color": "#10b981" }
    ]
  },
  "readinessScore": {
    "overall": 7.5,
    "factors": [
      { "label": "Market Size", "score": 8, "note": "brief explanation" },
      { "label": "Technical Complexity", "score": 6, "note": "brief explanation" },
      { "label": "Regulatory Clarity", "score": 7, "note": "brief explanation" },
      { "label": "Community Potential", "score": 9, "note": "brief explanation" }
    ]
  },
  "daoStructure": {
    "model": "Governance model description",
    "votingThreshold": "Threshold description",
    "proposalTypes": ["type 1", "type 2", "type 3", "type 4"],
    "roles": [
      { "name": "Role Name", "description": "Role description" }
    ]
  },
  "recommendedBlockchain": {
    "primary": "Chain Name",
    "reason": "Why this chain fits",
    "alternatives": [
      { "name": "Alt Chain", "tradeoff": "Tradeoff explanation" }
    ]
  },
  "smartContracts": {
    "contracts": [
      { "name": "ContractName", "standard": "ERC-20", "functions": ["fn1", "fn2"], "complexity": "Low" }
    ]
  },
  "goToMarket": {
    "phases": [
      { "phase": 1, "title": "Phase Title", "duration": "Month 1-3", "actions": ["action 1", "action 2", "action 3"] }
    ],
    "targetSegments": ["segment 1", "segment 2"],
    "keyPartnerships": ["partner 1", "partner 2"]
  },
  "competitorAnalysis": {
    "competitors": [
      { "name": "Competitor", "web2Model": "Their Web2 model", "web3Advantage": "Your Web3 advantage", "yourEdge": "Your specific edge" }
    ]
  },
  "whitepaper": {
    "abstract": "100-150 word professional abstract",
    "problem": "100-150 word problem statement",
    "solution": "100-150 word solution description",
    "tokenEconomics": "100-150 word token economics description",
    "roadmap": "100-150 word roadmap"
  }
}

Rules:
- distribution percentages must sum to exactly 100
- vestingSchedule percentages must sum to exactly 100
- overall readiness score is 1.0-10.0
- factor scores are 1-10 integers
- complexity must be exactly "Low", "Medium", or "High"
- name 3 real Web2 competitors in that space
- be specific about blockchains (e.g. "Polygon zkEVM", "Arbitrum One", "Base", "Solana")
- whitepaper sections should be professional grade, 100-200 words each`;

export async function transformIdeaToBlueprint(rawIdea: string): Promise<{ blueprint: Blueprint; isMock: boolean }> {
  const apiKey = process.env.TOGETHER_API_KEY;

  if (!apiKey) {
    console.warn("TOGETHER_API_KEY not set — returning mock blueprint");
    return { blueprint: MOCK_BLUEPRINT_EDUCHAIN, isMock: true };
  }

  try {
    const response = await fetch(TOGETHER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
        max_tokens: 4096,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Transform this Web2 startup idea into a complete Web3 blueprint:\n\n"${rawIdea}"` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      throw new Error(`Together API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) throw new Error("Empty response from Together API");

    const blueprint = JSON.parse(content) as Blueprint;
    return { blueprint, isMock: false };
  } catch (error) {
    console.error("Together AI error:", error);
    return { blueprint: MOCK_BLUEPRINT_EDUCHAIN, isMock: true };
  }
}
