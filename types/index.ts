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

export interface TokenModel {
  name: string;
  symbol: string;
  totalSupply: string;
  vestingSchedule: {
    founders: VestingScheduleEntry;
    community: VestingScheduleEntry;
    treasury: VestingScheduleEntry;
    team: VestingScheduleEntry;
  };
  distribution: TokenDistribution[];
}

export interface ReadinessFactor {
  label: string;
  score: number;
  note: string;
}

export interface ReadinessScore {
  overall: number;
  factors: ReadinessFactor[];
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
}

export interface BlockchainAlternative {
  name: string;
  tradeoff: string;
}

export interface RecommendedBlockchain {
  primary: string;
  reason: string;
  alternatives: BlockchainAlternative[];
}

export interface SmartContract {
  name: string;
  standard: string;
  functions: string[];
  complexity: "Low" | "Medium" | "High";
}

export interface SmartContracts {
  contracts: SmartContract[];
}

export interface GTMPhase {
  phase: number;
  title: string;
  duration: string;
  actions: string[];
}

export interface GoToMarket {
  phases: GTMPhase[];
  targetSegments: string[];
  keyPartnerships: string[];
}

export interface Competitor {
  name: string;
  web2Model: string;
  web3Advantage: string;
  yourEdge: string;
}

export interface CompetitorAnalysis {
  competitors: Competitor[];
}

export interface Whitepaper {
  abstract: string;
  problem: string;
  solution: string;
  tokenEconomics: string;
  roadmap: string;
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
