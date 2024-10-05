export interface IProposer {
  proposalId: number | bigint;
  description: string;
  recipient?: string;
  amount: string | number;
  minRequiredVote?: string | number;
  voteCount: number;
  votingDeadline: number | string;
  minVotesToPass?: number;
  executed: boolean;
}

// Define types for the function parameters
export interface CreateProposalParams {
  description: string;
  recipient: string;
  amount: string;
  duration: string;
  minVote: number;
}

export interface useProposalProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  resetForm?: () => void;
}
