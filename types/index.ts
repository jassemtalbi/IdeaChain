export interface User {
  id: string;
  email?: string;
  walletAddress?: string;
  name?: string;
  avatar?: string;
  createdAt: string;
}

export interface TokenDistribution {
  label: string;
  percentage: number;
  color: string;
}

export interface VestingScheduleEntry {
  percentage: number;
  cliffMonths: number;
  vestingMonths: number;
}

export interface FundraisingRound {
  round: string;
  raise: string;
  valuation: string;
  tokenPrice: string;
}

export interface TokenModel {
  name: string;
  symbol: string;
  totalSupply: string;
  type?: string;
  initialPrice?: string;
  fullyDilutedValuation?: string;
  revenueModel?: string;
  stakingYield?: string;
  burnMechanism?: string;
  vestingSchedule: {
    founders: VestingScheduleEntry;
    community: VestingScheduleEntry;
    treasury: VestingScheduleEntry;
    team: VestingScheduleEntry;
    publicSale?: VestingScheduleEntry;
  };
  distribution: TokenDistribution[];
  fundraisingRounds?: FundraisingRound[];
}

export interface ReadinessFactor {
  label: string;
  score: number;
  note: string;
}

export interface ReadinessRisk {
  risk: string;
  severity: "High" | "Medium" | "Low";
  mitigation: string;
}

export interface ReadinessScore {
  overall: number;
  marketSize?: string;
  tvlProjection?: string;
  factors: ReadinessFactor[];
  risks?: ReadinessRisk[];
}

export interface DAORole {
  name: string;
  description: string;
}

export interface DAOStructure {
  model: string;
  votingThreshold: string;
  proposalTypes: string[];
  roles: DAORole[];
  treasuryAllocation?: Record<string, string>;
}

export interface BlockchainAlternative {
  name: string;
  tradeoff: string;
}

export interface RecommendedBlockchain {
  primary: string;
  reason: string;
  gasEstimate?: string;
  tps?: string;
  ecosystem?: string;
  alternatives: BlockchainAlternative[];
  bridges?: string[];
}

export interface SmartContract {
  name: string;
  standard: string;
  functions: string[];
  events?: string[];
  complexity: "Low" | "Medium" | "High";
  gasPerTx?: string;
  description?: string;
}

export interface SmartContracts {
  auditBudget?: string;
  contracts: SmartContract[];
  securityFeatures?: string[];
}

export interface GTMPhase {
  phase: number;
  title: string;
  duration: string;
  budget?: string;
  kpis?: string[];
  actions: string[];
}

export interface GTMSegment {
  segment: string;
  size?: string;
  acquisitionChannel?: string;
}

export interface GTMPartnership {
  partner: string;
  type?: string;
  value?: string;
}

export interface GoToMarket {
  launchStrategy?: string;
  phases: GTMPhase[];
  targetSegments: (string | GTMSegment)[];
  keyPartnerships: (string | GTMPartnership)[];
  tokenLaunchpad?: string;
}

export interface Competitor {
  name: string;
  valuation?: string;
  monthlyActiveUsers?: string;
  web2Model: string;
  web3Advantage: string;
  yourEdge: string;
}

export interface Web3Competitor {
  name: string;
  tvl?: string;
  differentiator: string;
}

export interface CompetitorAnalysis {
  marketShare?: string;
  competitors: Competitor[];
  web3Competitors?: Web3Competitor[];
  moat?: string;
}

export interface Whitepaper {
  abstract: string;
  problem: string;
  solution: string;
  tokenEconomics: string;
  roadmap: string;
  technicalArchitecture?: string;
}

export interface MarketAnalysis {
  tam: string;
  sam: string;
  som: string;
  growthRate: string;
  keyTrends: string[];
  marketMaturity: string;
}

export interface UnitEconomics {
  cac: string;
  ltv: string;
  ltvCacRatio: string;
  paybackPeriodMonths: number;
  grossMargin: string;
}

export interface RevenueStream {
  stream: string;
  model: string;
  price: string;
  projectedMonthly: string;
}

export interface BusinessModelPlan {
  primaryRevenue: string;
  secondaryRevenue: string[];
  unitEconomics: UnitEconomics;
  revenueStreams: RevenueStream[];
  breakEvenAnalysis: string;
}

export interface YearProjection {
  revenue: string;
  expenses: string;
  netProfit: string;
  activeUsers: string;
  tvl: string;
}

export interface FinancialProjections {
  year1: YearProjection;
  year2: YearProjection;
  year3: YearProjection;
  keyAssumptions: string[];
  fundingNeeded: string;
}

export interface BusinessPlan {
  marketAnalysis: MarketAnalysis;
  businessModel: BusinessModelPlan;
  financialProjections: FinancialProjections;
}

// ── Audit Plan ────────────────────────────────────────────────
export interface AuditCheckItem {
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  description: string;
  recommendation: string;
  openZeppelinModule?: string;
}

export interface AuditFirm {
  name: string;
  specialty: string;
  estimatedCost: string;
  turnaround: string;
  website: string;
  tier: "Top-tier" | "Mid-tier" | "Specialized";
}

export interface AuditPlan {
  summary: string;
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  estimatedBudget: string;
  checklist: AuditCheckItem[];
  recommendedFirms: AuditFirm[];
  auditPhases: string[];
  openZeppelinLibraries: string[];
}

export interface DNAComponent {
  label: string;
  value: string;
  weight: number;
}

export interface IdeaDNA {
  components: DNAComponent[];
  fingerprint: string;
  uniquenessScore: number;
}

export interface NFTMetadata {
  tokenId: string;
  standard: "ERC-721";
  contract: string;
  royaltyPercent: number;
  metadataURI: string;
}

export interface Blueprint {
  tokenModel: TokenModel;
  readinessScore: ReadinessScore;
  daoStructure: DAOStructure;
  recommendedBlockchain: RecommendedBlockchain;
  smartContracts: SmartContracts;
  goToMarket: GoToMarket;
  competitorAnalysis: CompetitorAnalysis;
  whitepaper: Whitepaper;
  tags: string[];
  businessPlan?: BusinessPlan;
  auditPlan?: AuditPlan;
  ideaDNA?: IdeaDNA;
  nftMetadata?: NFTMetadata;
}

export interface Idea {
  id: string;
  userId: string;
  user?: User;
  title: string;
  rawIdea: string;
  blueprint: Blueprint;
  voteCount: number;
  commentCount: number;
  userHasVoted?: boolean;
  createdAt: string;
  tags: string[];
}

export interface Comment {
  id: string;
  ideaId: string;
  userId: string;
  user?: User;
  content: string;
  createdAt: string;
}

export interface Vote {
  id: string;
  ideaId: string;
  userId: string;
  createdAt: string;
}

export type DAOVoteChoice = "for" | "against" | "abstain";

export interface DAOProposal {
  id: string;
  ideaId: string;
  authorId: string;
  author?: User;
  title: string;
  description: string;
  status: "open" | "passed" | "rejected" | "expired";
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  endsAt: string;
  createdAt: string;
  userVote?: DAOVoteChoice | null;
}

export interface DAOVote {
  id: string;
  proposalId: string;
  userId: string;
  choice: DAOVoteChoice;
  createdAt: string;
}

// ── Feature Bounties ──────────────────────────────────────────────────────
export interface BountySubmission {
  id: string;
  developerId: string;
  developer?: User;
  prLink: string;
  description: string;
  approvalsCount: number;
  rejectionsCount: number;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
  userVote?: "approve" | "reject" | null;
}

export interface Bounty {
  id: string;
  ideaId: string;
  authorId: string;
  author?: User;
  title: string;
  description: string;
  reward: string;
  status: "open" | "claimed" | "submitted" | "completed" | "cancelled";
  deadline: string;
  submissions: BountySubmission[];
  createdAt: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  bountyPoints: number;
  bountiesWon: number;
}

// ── Conversation / Discovery Session ──────────────────────────────────────
export interface ConversationTurn {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: "ai" | "user";
  content: string;
  type?: "question" | "acknowledgement" | "blueprint_ready";
}

export interface ConversationResponse {
  type: "question";
  content: string; // "DISCOVERY_COMPLETE" signals end of session
}
