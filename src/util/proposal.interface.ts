export interface IProposer {
  description: string;
  recipient?: string;
  amount: string;
  minRequiredVote: number;
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
