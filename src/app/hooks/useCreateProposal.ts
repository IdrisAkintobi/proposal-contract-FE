import {
  CreateProposalParams,
  useProposalProps,
} from "@/util/proposal.interface";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { parseEther } from "ethers";
import { useCallback } from "react";
import { toast } from "sonner";
import { liskSepolia } from "../../util/init";
import { useBEContract } from "./useContract";

export const useCreateProposal = ({
  setLoading,
  resetForm,
}: useProposalProps) => {
  const BEContract = useBEContract(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

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
      if (Number(chainId) !== liskSepolia.chainId) {
        toast.error("You are not connected to the right network");
        return;
      }

      if (!BEContract) {
        toast.error("Cannot get BEContract!");
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

        // Wait for the transaction receipt
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Proposal Creation successful");
          return;
        }

        toast.error("Proposal Creation failed");
      } catch (error: unknown) {
        console.error("Error while creating proposal: ", error);
        toast.error("Proposal Creation errored");
      } finally {
        if (resetForm) resetForm();
        setLoading(false);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, chainId, BEContract]
  );
};
