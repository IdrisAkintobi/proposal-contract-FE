import {
  CreateProposalParams,
  useProposalProps,
} from "@/util/proposal.interface";
import { useAppKitAccount } from "@reown/appkit/react";
import { parseEther } from "ethers";
import { useCallback } from "react";
import { toast } from "sonner";
import { useBEContract } from "./useContract";

export const useCreateProposal = ({
  setLoading,
  resetForm,
}: useProposalProps) => {
  const BEContract = useBEContract(true);
  const { address } = useAppKitAccount();

  return useCallback(
    async ({
      description,
      recipient,
      amount,
      duration,
      minVote,
    }: CreateProposalParams) => {
      if (!description || !recipient || !amount || !duration || !minVote) {
        toast.error("Missing field(s)");
        return;
      }

      if (!address) {
        toast.error("Connect your wallet!");
        return;
      }

      if (!BEContract) {
        toast.error("Something went wrong!");
        return;
      }

      setLoading(true);
      try {
        // Estimate gas
        const estimatedGas = await BEContract.createProposal.estimateGas(
          description,
          recipient,
          parseEther(amount),
          duration,
          minVote
        );

        // Send the transaction
        const tx = await BEContract.createProposal(
          description,
          recipient,
          parseEther(amount),
          duration,
          minVote,
          {
            gasLimit: (estimatedGas * BigInt(120)) / BigInt(100), // 120% gas limit
          }
        );

        toast.success("Proposal Creation successful");
        tx.wait();
      } catch (error: unknown) {
        console.error("Error while creating proposal: ", error);
        toast.error("Proposal Creation failed");
      } finally {
        if (resetForm) resetForm();
        setLoading(false);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, BEContract]
  );
};
