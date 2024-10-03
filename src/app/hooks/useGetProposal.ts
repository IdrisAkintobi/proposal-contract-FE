import ABI from "@/ABI/proposal.json";
import { IProposer } from "@/util/proposal.interface";
import { useAppKitNetwork } from "@reown/appkit/react";
import { BytesLike, Interface, formatEther } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { liskSepolia } from "../../util/init";
import { useBEContract, useCustomContract } from "./useContract";

const multicallAbi = [
  "function tryAggregate(bool requireSuccess, (address target, bytes callData)[] calls) returns ((bool success, bytes returnData)[] returnData)",
];

export const useGetProposal = () => {
  const BEContract = useBEContract();
  const multiCallContract = useCustomContract({
    address: process.env.NEXT_PUBLIC_MULTICALL_V2_ADDRESS as string,
    abi: multicallAbi,
  });
  const { chainId } = useAppKitNetwork();

  const [proposals, setProposals] = useState<IProposer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProposals = async () => {
      const BEContractInterface = new Interface(ABI);
      if (Number(chainId) !== liskSepolia.chainId) {
        toast.error(`Please connect to the ${liskSepolia.name} network`);
        return;
      }

      if (!multiCallContract || !BEContract) return;

      setLoading(true);
      try {
        const proposalCount = Number(await BEContract.proposalCount());

        const proposalsIds = Array.from(
          { length: proposalCount },
          (_, i) => i + 1
        );

        const calls = proposalsIds.map((id) => ({
          target: process.env.NEXT_PUBLIC_BE_CONTRACT_ADDRESS,
          callData: BEContractInterface.encodeFunctionData("proposals", [id]),
        }));

        // Estimate gas
        const responses = await multiCallContract.tryAggregate.staticCall(
          true,
          calls
        );

        const decodedResults: IProposer[] = responses.map(
          (res: { returnData: BytesLike }) =>
            BEContractInterface.decodeFunctionResult(
              "proposals",
              res.returnData
            )
        );

        const proposals = decodedResults.map((proposal) => ({
          description: proposal.description,
          amount: formatEther(proposal.amount),
          minRequiredVote: Number(proposal.minVotesToPass),
          voteCount: Number(proposal.voteCount),
          votingDeadline: new Date(
            Number(proposal.votingDeadline) * 1000
          ).toLocaleString("en-CA"),
          executed: proposal.executed,
        }));

        setProposals(proposals);
      } catch (error: unknown) {
        console.error("Error fetching proposal: ", error);
        toast.error("Error fetching proposal");
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiCallContract, BEContract]);

  return { proposals, loading };
};
