import { Blueprint } from "@/types";

export const MOCK_BLUEPRINT_EDUCHAIN: Blueprint = {
  tags: ["EdTech", "DAO", "NFT", "Polygon", "DeFi"],
  tokenModel: {
    name: "EduChain Token",
    symbol: "EDU",
    totalSupply: "100,000,000",
    vestingSchedule: {
      founders: { percentage: 15, cliffMonths: 12, vestingMonths: 36 },
      community: { percentage: 40, cliffMonths: 0, vestingMonths: 48 },
      treasury: { percentage: 30, cliffMonths: 6, vestingMonths: 24 },
      team: { percentage: 15, cliffMonths: 12, vestingMonths: 24 },
    },
    distribution: [
      { label: "Community", percentage: 40, color: "#8b5cf6" },
      { label: "Treasury", percentage: 30, color: "#06b6d4" },
      { label: "Founders", percentage: 15, color: "#ec4899" },
      { label: "Team", percentage: 15, color: "#10b981" },
    ],
  },
  readinessScore: {
    overall: 8.2,
    factors: [
      { label: "Market Size", score: 9, note: "Global tutoring market $8B+" },
      { label: "Technical Complexity", score: 7, note: "Moderate smart contract requirements" },
      { label: "Regulatory Clarity", score: 8, note: "Education tokens face fewer regulatory hurdles" },
      { label: "Community Potential", score: 9, note: "Strong student/educator community incentives" },
    ],
  },
  daoStructure: {
    model: "Token-weighted voting with quadratic scaling",
    votingThreshold: "5% of circulating supply for proposals, 10% quorum",
    proposalTypes: ["Fee changes", "New feature development", "Grant allocation", "Partnership approvals"],
    roles: [
      { name: "Core Contributors", description: "Development team with 2x voting weight on technical proposals" },
      { name: "Educators Guild", description: "Verified tutors with special governance rights over quality standards" },
      { name: "Community Council", description: "Elected 7-member council for day-to-day governance decisions" },
    ],
  },
  recommendedBlockchain: {
    primary: "Polygon (zkEVM)",
    reason: "Low gas fees critical for micropayments in tutoring sessions. EVM-compatible for wide developer support. 2-second finality.",
    alternatives: [
      { name: "Arbitrum One", tradeoff: "Higher security guarantees but slightly higher fees" },
      { name: "Solana", tradeoff: "Faster throughput but weaker EVM ecosystem" },
    ],
  },
  smartContracts: {
    contracts: [
      { name: "EduToken", standard: "ERC-20", functions: ["mint", "burn", "stake", "unstake", "delegate"], complexity: "Low" },
      { name: "CredentialNFT", standard: "ERC-721", functions: ["mint", "verify", "revoke", "transferCredential"], complexity: "Medium" },
      { name: "SessionPayment", standard: "Custom", functions: ["createSession", "releasePayment", "disputeSession", "rateSession"], complexity: "High" },
      { name: "GovernanceDAO", standard: "OpenZeppelin Governor", functions: ["propose", "vote", "execute", "cancel"], complexity: "Medium" },
    ],
  },
  goToMarket: {
    phases: [
      { phase: 1, title: "Community Bootstrap", duration: "Month 1–3", actions: ["Launch educator onboarding program", "Partner with 5 universities", "Airdrop EDU tokens to early tutors"] },
      { phase: 2, title: "Product Launch", duration: "Month 4–8", actions: ["Mainnet smart contract deployment", "Mobile app beta launch", "First 1000 verified tutors onboarded"] },
      { phase: 3, title: "Scale & Governance", duration: "Month 9–18", actions: ["DAO governance handover", "Cross-chain expansion", "Corporate training vertical launch"] },
    ],
    targetSegments: ["University students (18-25)", "Professional certification seekers", "K-12 supplemental learners", "Corporate L&D managers"],
    keyPartnerships: ["Coursera integration", "LinkedIn Learning API", "Google Classroom", "University credential verification bodies"],
  },
  competitorAnalysis: {
    competitors: [
      { name: "Wyzant", web2Model: "Centralized marketplace taking 25% cut", web3Advantage: "EDU token incentivizes tutors with 0% platform fee", yourEdge: "Verified on-chain credentials eliminate fraud" },
      { name: "Chegg Tutors", web2Model: "Subscription model, corporate owned", web3Advantage: "Community-owned DAO with tutor governance rights", yourEdge: "Tutor reputation is portable self-owned NFT" },
      { name: "Superprof", web2Model: "Listing fee model, no quality guarantees", web3Advantage: "Smart contract escrow guarantees session payment", yourEdge: "Quadratic funding for underserved subject areas" },
    ],
  },
  whitepaper: {
    abstract: "EduChain transforms the $8B global tutoring market by creating a decentralized, community-owned marketplace where educational credentials are verifiable on-chain, payments are instant and trustless, and governance belongs to educators and learners.",
    problem: "Traditional tutoring platforms extract 20-40% of tutor earnings, store credentials in centralized silos vulnerable to fraud, and provide no mechanism for quality enforcement beyond subjective reviews. Students overpay; tutors are underpaid; credentials are unverifiable.",
    solution: "EduChain deploys a Polygon-based smart contract system enabling NFT-based credential verification, escrow-based session payments, EDU token rewards for quality sessions, and DAO governance over platform policies.",
    tokenEconomics: "100M EDU tokens total supply. 40% distributed to community over 4 years. Protocol revenue (1% session fee) flows to DAO treasury. Staking EDU grants governance rights and fee discounts. Token burn mechanism: 10% of treasury fees burned quarterly.",
    roadmap: "Q1 2025: Testnet launch, credential partner integrations. Q2 2025: Mainnet, first 100 tutors. Q3 2025: Mobile app, 1000 tutors. Q4 2025: DAO governance activation. Q1 2026: Cross-chain expansion.",
  },
};

export const MOCK_BLUEPRINT_RIDESHARE: Blueprint = {
  tags: ["Transportation", "DeFi", "DAO", "Arbitrum", "RWA"],
  tokenModel: {
    name: "RideDAO Token",
    symbol: "RIDE",
    totalSupply: "500,000,000",
    vestingSchedule: {
      founders: { percentage: 10, cliffMonths: 12, vestingMonths: 48 },
      community: { percentage: 50, cliffMonths: 0, vestingMonths: 60 },
      treasury: { percentage: 25, cliffMonths: 6, vestingMonths: 36 },
      team: { percentage: 15, cliffMonths: 12, vestingMonths: 36 },
    },
    distribution: [
      { label: "Community", percentage: 50, color: "#8b5cf6" },
      { label: "Treasury", percentage: 25, color: "#06b6d4" },
      { label: "Team", percentage: 15, color: "#10b981" },
      { label: "Founders", percentage: 10, color: "#ec4899" },
    ],
  },
  readinessScore: {
    overall: 7.6,
    factors: [
      { label: "Market Size", score: 10, note: "Global rideshare market $150B+" },
      { label: "Technical Complexity", score: 6, note: "Real-time matching + payments requires robust infra" },
      { label: "Regulatory Clarity", score: 5, note: "Transportation regulations vary significantly by jurisdiction" },
      { label: "Community Potential", score: 9, note: "Strong driver incentive alignment with ownership model" },
    ],
  },
  daoStructure: {
    model: "Quadratic voting with driver guild veto",
    votingThreshold: "3% of circulating supply for proposals, 8% quorum",
    proposalTypes: ["Fare algorithm changes", "Geographic expansion", "Driver incentive programs", "Safety policy updates"],
    roles: [
      { name: "Driver Guild", description: "All verified drivers — veto rights on fare and policy changes" },
      { name: "Rider Council", description: "Elected riders representing passenger interests" },
      { name: "Protocol Team", description: "Core engineers with advisory but non-voting role" },
    ],
  },
  recommendedBlockchain: {
    primary: "Arbitrum One",
    reason: "Ethereum security with low fees essential for high-frequency micro-transactions per ride. Proven DeFi ecosystem for yield on idle treasury funds.",
    alternatives: [
      { name: "Polygon PoS", tradeoff: "Lower fees but less battle-tested for financial applications" },
      { name: "Base", tradeoff: "Growing ecosystem, Coinbase backing, but newer" },
    ],
  },
  smartContracts: {
    contracts: [
      { name: "RideToken", standard: "ERC-20", functions: ["mint", "burn", "stake", "claimRewards"], complexity: "Low" },
      { name: "RideEscrow", standard: "Custom", functions: ["initRide", "completeRide", "disputeRide", "autoRelease"], complexity: "High" },
      { name: "DriverNFT", standard: "ERC-721", functions: ["mint", "updateRating", "suspend", "reinstate"], complexity: "Medium" },
      { name: "RideDAO", standard: "OpenZeppelin Governor", functions: ["propose", "castVote", "execute", "queue"], complexity: "Medium" },
    ],
  },
  goToMarket: {
    phases: [
      { phase: 1, title: "Driver Acquisition", duration: "Month 1–4", actions: ["Launch driver onboarding with $500 RIDE bonus", "Partner with 3 mid-size cities", "Build rider mobile apps (iOS + Android)"] },
      { phase: 2, title: "Market Launch", duration: "Month 5–10", actions: ["Public launch in 3 pilot cities", "0% commission for first 6 months", "RIDE token TGE event"] },
      { phase: 3, title: "Expansion", duration: "Month 11–24", actions: ["Expand to 20 cities", "DAO votes on geographic prioritization", "Add electric vehicle incentive program"] },
    ],
    targetSegments: ["Gig economy drivers seeking ownership", "Eco-conscious riders", "Underserved suburban/rural areas", "Corporate travel managers"],
    keyPartnerships: ["EV charging networks", "City transit authorities", "Stripe for fiat on-ramp", "Chainlink for real-world data"],
  },
  competitorAnalysis: {
    competitors: [
      { name: "Uber", web2Model: "25% platform cut, drivers have no equity", web3Advantage: "RIDE token gives drivers real ownership stake", yourEdge: "DAO governance means drivers shape their own platform" },
      { name: "Lyft", web2Model: "Corporate-owned, frequent policy changes", web3Advantage: "Immutable smart contracts, policy changes require DAO vote", yourEdge: "Driver guild veto prevents platform from exploiting drivers" },
      { name: "Grab", web2Model: "Southeast Asia monopoly with high fees", web3Advantage: "Cross-border payments via stablecoins, no currency conversion fees", yourEdge: "Local driver communities can fork and govern regional DAOs" },
    ],
  },
  whitepaper: {
    abstract: "RideDAO democratizes the $150B global rideshare market by giving drivers genuine ownership through RIDE tokens, eliminating the 25% platform tax, and replacing corporate governance with transparent DAO decision-making.",
    problem: "Uber and Lyft extract 25-30% of every fare while drivers bear all vehicle costs, insurance, and risk. Drivers have no say in fare algorithms, policy changes, or platform direction. They build the platform but own nothing.",
    solution: "RideDAO replaces the platform company with a smart contract: RIDE tokens represent ownership, escrow contracts handle payments trustlessly, and a DAO governed by drivers and riders sets all platform parameters.",
    tokenEconomics: "500M RIDE tokens. 50% to community (drivers/riders) over 5 years. 1% of each fare burns RIDE, creating deflationary pressure. Staked RIDE earns 40% of protocol revenue. Drivers earn RIDE bonuses for high ratings and reliability.",
    roadmap: "Q2 2025: Pilot in Austin, TX and Miami, FL. Q3 2025: RIDE token launch, DAO activation. Q4 2025: 10 US cities. 2026: International expansion. 2027: Full DAO governance, team exits operational role.",
  },
};

export const MOCK_BLUEPRINTS = [MOCK_BLUEPRINT_EDUCHAIN, MOCK_BLUEPRINT_RIDESHARE];
