import { formatEther } from "ethers";
import { allowedNetworks } from "./init";
import { IProposer } from "./proposal.interface";

export const mapProposalToUIData = (proposal: IProposer) => {
  return {
    proposalId: proposal.proposalId?.toString(),
    description: proposal.description,
    amount: formatEther(proposal.amount),
    minRequiredVote: proposal.minVotesToPass?.toString(),
    voteCount: Number(proposal.voteCount),
    votingDeadline: new Date(
      Number(proposal.votingDeadline) * 1000
    ).toLocaleString("en-CA"),
    executed: proposal.executed,
  };
};

export const allowedNetworkNames = allowedNetworks.map(({ name }) => name);

export const checkIsAllowedNetwork = (networkName: string) => {
  return allowedNetworkNames.some((name) => name === networkName);
};
