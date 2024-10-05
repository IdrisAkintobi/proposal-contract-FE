import ABI from "@/ABI/proposal.json";
import { IProposer } from "@/util/proposal.interface";
import { mapProposalToUIData } from "@/util/util-functions";
import { BytesLike, Interface } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useProposerContext } from "../context/ProposerContext";
import { useBEContract, useCustomContract } from "./useContract";

const multicallAbi = [
  "function tryAggregate(bool requireSuccess, (address target, bytes callData)[] calls) returns ((bool success, bytes returnData)[] returnData)",
];

export const useGetProposal = () => {
  const { setProposals } = useProposerContext();
  const BEContract = useBEContract();
  const multiCallContract = useCustomContract({
    address: process.env.NEXT_PUBLIC_MULTICALL_V2_ADDRESS as string,
    abi: multicallAbi,
  });

  const [loading, setLoading] = useState(false);

  const fetchProposals = useCallback(async () => {
    setLoading(true);
    const BEContractInterface = new Interface(ABI);

    if (!multiCallContract || !BEContract) return;

    try {
      const proposalCount = Number(await BEContract.proposalCount());

      const proposalsIds = Array.from(
        { length: proposalCount - 1 },
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
          BEContractInterface.decodeFunctionResult("proposals", res.returnData)
      );

      const proposals = decodedResults.map(mapProposalToUIData);

      setProposals!(proposals);
    } catch (error: unknown) {
      console.error("Error fetching proposal: ", error);
      toast.error("Error fetching proposal");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BEContract, multiCallContract]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  return { loading };
};
