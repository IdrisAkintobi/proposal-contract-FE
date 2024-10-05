import { allowedNetworks } from "@/util/init";
import { IProposer } from "@/util/proposal.interface";
import { formatEther } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";

export const mapProposalToUIData = (proposal: IProposer, idx?: number) => {
  return {
    proposalId: idx ? idx + 1 : Number(proposal.proposalId),
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

const errorDecoder = ErrorDecoder.create();
export const decodeError = async (error: unknown): Promise<string> => {
  const decodedError = await errorDecoder.decode(error);
  console.log("decodedError: ", decodedError);
  return decodedError.reason || "An error occurred";
};
