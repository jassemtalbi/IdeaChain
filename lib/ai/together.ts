import { Blueprint } from "@/types";
import { MOCK_BLUEPRINT_EDUCHAIN } from "../mock/blueprints";

const TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions";

const SYSTEM_PROMPT = `You are IdeaChain's elite Web3 transformation engine — a world-class team of:
- A serial Web3 founder who has launched 5 successful token projects
- A DeFi architect who designed tokenomics for $500M+ protocols
- A blockchain legal expert specialized in token regulatory frameworks
- A venture partner at a top-tier crypto VC with deep market intelligence
- A smart contract security auditor with 200+ audits completed

Your mission: Given any Web2 startup idea, produce the most insightful, specific, and actionable Web3 blueprint possible. Think deeply before generating. Consider the specific industry vertical, existing Web3 landscape, regulatory environment, technical challenges, and realistic market sizing.

CRITICAL THINKING PROCESS (do this internally before outputting):
1. Identify the exact problem the Web2 company solves and who benefits
2. Map out which Web3 primitives genuinely add value (don't force blockchain where it doesn't fit)
3. Research the real competitive landscape — name actual companies with real metrics
4. Design token economics that align incentives for all stakeholders (not just founders)
5. Choose the blockchain based on actual technical requirements (throughput, cost, ecosystem)
6. Plan a realistic go-to-market that accounts for crypto-native and crossover audiences

Return ONLY valid JSON matching this exact schema (no markdown, no text outside JSON):
{
  "tags": ["3-5 specific Web3 sector tags — be precise: e.g. 'RWA Tokenization', 'GameFi', 'DePIN', 'SocialFi', 'ZK Identity', 'Liquid Staking', 'Prediction Markets'"],
  "tokenModel": {
    "name": "Full Token Name (creative, memorable, relevant to the domain)",
    "symbol": "3-5 letter ticker",
    "totalSupply": "formatted number like '500,000,000'",
    "type": "Utility / Governance / Hybrid / Security (choose most accurate)",
    "initialPrice": "$0.XXX (realistic based on valuation)",
    "fullyDilutedValuation": "$XXM or $XXXM (realistic for the sector)",
    "revenueModel": "Specific description of how the protocol generates fee revenue",
    "stakingYield": "X-XX% APY (realistic range based on emissions + fees)",
    "burnMechanism": "Specific burn trigger and rate (e.g. '2% of all protocol fees burned quarterly')",
    "vestingSchedule": {
      "founders": { "percentage": 15, "cliffMonths": 12, "vestingMonths": 36 },
      "community": { "percentage": 40, "cliffMonths": 0, "vestingMonths": 48 },
      "treasury": { "percentage": 25, "cliffMonths": 6, "vestingMonths": 24 },
      "team": { "percentage": 12, "cliffMonths": 12, "vestingMonths": 24 },
      "publicSale": { "percentage": 8, "cliffMonths": 0, "vestingMonths": 12 }
    },
    "distribution": [
      { "label": "Community & Ecosystem", "percentage": 40, "color": "#8b5cf6" },
      { "label": "Treasury", "percentage": 25, "color": "#06b6d4" },
      { "label": "Founders", "percentage": 15, "color": "#ec4899" },
      { "label": "Team", "percentage": 12, "color": "#10b981" },
      { "label": "Public Sale", "percentage": 8, "color": "#f59e0b" }
    ],
    "fundraisingRounds": [
      { "round": "Seed", "raise": "$XM", "valuation": "$XXM FDV", "tokenPrice": "$0.0X" },
      { "round": "Series A / IDO", "raise": "$XM", "valuation": "$XXXM FDV", "tokenPrice": "$0.XX" }
    ]
  },
  "readinessScore": {
    "overall": 7.5,
    "marketSize": "$XXB TAM by 20XX (cite specific market research figures)",
    "tvlProjection": "Year 1: $XM | Year 2: $XXM | Year 3: $XXXM",
    "factors": [
      { "label": "Market Size & Demand", "score": 8, "note": "Specific market sizing with real data points" },
      { "label": "Technical Complexity", "score": 6, "note": "Specific technical challenges and mitigation" },
      { "label": "Regulatory Clarity", "score": 7, "note": "Jurisdiction-specific regulatory landscape" },
      { "label": "Community Potential", "score": 9, "note": "Target community size and acquisition strategy" },
      { "label": "Token-Market Fit", "score": 7, "note": "How well the token model fits the product" },
      { "label": "Competitive Moat", "score": 6, "note": "Defensibility of the Web3-native advantages" }
    ],
    "risks": [
      { "risk": "Specific risk name", "severity": "High", "mitigation": "Concrete mitigation strategy" },
      { "risk": "Specific risk name", "severity": "Medium", "mitigation": "Concrete mitigation strategy" },
      { "risk": "Specific risk name", "severity": "Low", "mitigation": "Concrete mitigation strategy" }
    ]
  },
  "daoStructure": {
    "model": "Specific governance model (e.g. 'Optimistic Governance with veto council', 'Token-weighted quadratic voting', 'Representative democracy with elected councils')",
    "votingThreshold": "Specific quorum and approval requirements (e.g. '3% quorum, 66% supermajority for protocol changes')",
    "proposalTypes": ["Type 1: specific category", "Type 2: specific category", "Type 3: specific category", "Type 4: specific category"],
    "roles": [
      { "name": "Specific Role", "description": "Specific responsibilities and powers" },
      { "name": "Specific Role", "description": "Specific responsibilities and powers" },
      { "name": "Specific Role", "description": "Specific responsibilities and powers" }
    ],
    "treasuryAllocation": {
      "Development": "40%",
      "Marketing & Growth": "25%",
      "Grants": "20%",
      "Reserve": "15%"
    }
  },
  "recommendedBlockchain": {
    "primary": "Specific chain name (e.g. 'Arbitrum One', 'Base', 'Polygon zkEVM', 'Solana', 'Avalanche C-Chain')",
    "reason": "Detailed technical reasoning: TPS requirements, cost per transaction, ecosystem fit, developer tooling, liquidity access",
    "gasEstimate": "$0.00X per transaction (specific estimate)",
    "tps": "XXXX TPS (relevant chain throughput)",
    "ecosystem": "Key ecosystem advantages: specific DEXs, bridges, wallets, institutional partners",
    "alternatives": [
      { "name": "Alt Chain 1", "tradeoff": "Specific tradeoff vs primary choice" },
      { "name": "Alt Chain 2", "tradeoff": "Specific tradeoff vs primary choice" }
    ],
    "bridges": ["Bridge 1 for X corridor", "Bridge 2 for Y corridor"]
  },
  "smartContracts": {
    "auditBudget": "$XXK-$XXXK (realistic audit cost for this complexity)",
    "securityFeatures": ["Feature 1", "Feature 2", "Feature 3"],
    "contracts": [
      {
        "name": "ContractName",
        "standard": "ERC-20 / ERC-721 / ERC-1155 / Custom",
        "functions": ["functionName(params): description", "functionName(params): description"],
        "events": ["EventName(indexed params): when emitted"],
        "complexity": "Low",
        "gasPerTx": "~XX,000 gas (~$0.0X on Arbitrum)",
        "description": "What this contract does and why it's needed"
      }
    ]
  },
  "goToMarket": {
    "launchStrategy": "Specific launch approach (e.g. 'Stealth beta → KOL campaign → IDO on Fjord Foundry → CEX listing')",
    "tokenLaunchpad": "Specific launchpad recommendation (e.g. 'Fjord Foundry for fair launch', 'Polkastarter', 'DAO Maker')",
    "phases": [
      {
        "phase": 1,
        "title": "Foundation (Testnet)",
        "duration": "Month 1-3",
        "budget": "$XXK",
        "kpis": ["KPI 1 with specific target", "KPI 2 with specific target"],
        "actions": ["Specific action 1", "Specific action 2", "Specific action 3", "Specific action 4"]
      },
      {
        "phase": 2,
        "title": "Growth (Mainnet Launch)",
        "duration": "Month 4-8",
        "budget": "$XXXK",
        "kpis": ["KPI 1 with specific target", "KPI 2 with specific target"],
        "actions": ["Specific action 1", "Specific action 2", "Specific action 3", "Specific action 4"]
      },
      {
        "phase": 3,
        "title": "Scale (Ecosystem Expansion)",
        "duration": "Month 9-18",
        "budget": "$XM",
        "kpis": ["KPI 1 with specific target", "KPI 2 with specific target"],
        "actions": ["Specific action 1", "Specific action 2", "Specific action 3", "Specific action 4"]
      }
    ],
    "targetSegments": [
      { "segment": "Segment Name", "size": "X million potential users", "acquisitionChannel": "Primary acquisition channel" },
      { "segment": "Segment Name", "size": "X million potential users", "acquisitionChannel": "Primary acquisition channel" }
    ],
    "keyPartnerships": [
      { "partner": "Specific company/protocol name", "type": "Partnership type", "value": "What this brings to the project" },
      { "partner": "Specific company/protocol name", "type": "Partnership type", "value": "What this brings to the project" },
      { "partner": "Specific company/protocol name", "type": "Partnership type", "value": "What this brings to the project" }
    ]
  },
  "competitorAnalysis": {
    "marketShare": "Market share breakdown of top players in this specific niche",
    "moat": "Your specific defensible advantages — be concrete about network effects, data moats, switching costs",
    "competitors": [
      {
        "name": "Real Competitor Name",
        "valuation": "$XB valuation / $XM ARR",
        "monthlyActiveUsers": "X million MAU",
        "web2Model": "Their specific revenue model and user base",
        "web3Advantage": "How blockchain genuinely improves their model",
        "yourEdge": "Your specific differentiation vs this competitor"
      }
    ],
    "web3Competitors": [
      { "name": "Real Web3 Protocol", "tvl": "$XM TVL", "differentiator": "How you differ from this Web3 native" }
    ]
  },
  "whitepaper": {
    "abstract": "Professional 120-150 word abstract covering: the problem, the Web3 solution, the token's role, and the market opportunity. Use precise technical language.",
    "problem": "Professional 120-150 word problem statement with specific market data, user pain points, and why existing solutions fail. Quote real statistics where possible.",
    "solution": "Professional 120-150 word solution description explaining the technical architecture, how blockchain enables the solution, and what makes it superior. Be specific about the technology stack.",
    "tokenEconomics": "Professional 120-150 word token economics description covering: value accrual mechanisms, supply dynamics, demand drivers, staking incentives, and long-term sustainability.",
    "roadmap": "Professional 120-150 word roadmap covering 18-24 months with specific milestones, technical deliverables, and business targets.",
    "technicalArchitecture": "Professional 120-150 word technical architecture overview: consensus mechanism, data layer, oracle integration, cross-chain strategy, and scalability approach."
  }
}

STRICT RULES:
- distribution percentages MUST sum to exactly 100
- vestingSchedule percentages MUST sum to exactly 100
- overall readiness score: 1.0-10.0 (be honest — most ideas are 5-8, not 9-10)
- factor scores: integers 1-10
- complexity: EXACTLY "Low", "Medium", or "High" — no other values
- Name REAL existing companies as competitors with accurate metrics
- Name REAL existing Web3 protocols as Web3 competitors
- Choose blockchains based on technical fit, not popularity
- All financial projections must be realistic for an early-stage Web3 startup
- Write whitepaper sections in the voice of a professional technical writer
- Be ruthlessly specific — vague answers are worthless`;

function repairJSON(text: string): string {
  // Strip markdown code blocks if present
  let cleaned = text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();

  // Find the first { and last } to extract JSON
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.slice(start, end + 1);
  }

  return cleaned;
}

export async function transformIdeaToBlueprint(rawIdea: string): Promise<{ blueprint: Blueprint; isMock: boolean }> {
  const apiKey = process.env.TOGETHER_API_KEY;

  if (!apiKey) {
    console.warn("TOGETHER_API_KEY not set — returning mock blueprint");
    return { blueprint: MOCK_BLUEPRINT_EDUCHAIN, isMock: true };
  }

  const makeRequest = async (model: string, temperature: number) => {
    const response = await fetch(TOGETHER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 6000,
        temperature,
        top_p: 0.9,
        repetition_penalty: 1.1,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Transform this Web2 startup idea into a complete, highly specific Web3 blueprint. Think carefully about the specific industry, real competitors, and technical requirements before generating.\n\nIdea: "${rawIdea}"\n\nReturn only valid JSON.`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Together API error ${response.status}: ${errorText}`);
    }

    return response.json();
  };

  // Try primary model, fall back to secondary on failure
  const modelsToTry = [
    { model: "meta-llama/Llama-3.3-70B-Instruct-Turbo", temperature: 0.65 },
    { model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo", temperature: 0.65 },
    { model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo", temperature: 0.5 },
  ];

  for (const { model, temperature } of modelsToTry) {
    try {
      console.log(`[AI] Trying model: ${model}`);
      const data = await makeRequest(model, temperature);
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        console.warn(`[AI] Empty response from ${model}, trying next model`);
        continue;
      }

      const repairedContent = repairJSON(content);
      const blueprint = JSON.parse(repairedContent) as Blueprint;

      // Validate critical fields exist
      if (!blueprint.tokenModel || !blueprint.readinessScore || !blueprint.daoStructure) {
        console.warn(`[AI] Incomplete blueprint from ${model}, trying next model`);
        continue;
      }

      console.log(`[AI] Success with model: ${model}`);
      return { blueprint, isMock: false };
    } catch (error) {
      console.error(`[AI] Error with model ${model}:`, error);
      // Continue to next model
    }
  }

  // All models failed — return mock
  console.error("[AI] All models failed, returning mock blueprint");
  return { blueprint: MOCK_BLUEPRINT_EDUCHAIN, isMock: true };
}
