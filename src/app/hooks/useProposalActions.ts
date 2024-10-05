import { useBEContract } from "@/hooks/useContract";
import {
  CreateProposalParams,
  useProposalProps,
} from "@/util/proposal.interface";
import { decodeError } from "@/util/util-functions";
import { useAppKitAccount } from "@reown/appkit/react";
import { parseEther } from "ethers";
import { useCallback } from "react";
import { toast } from "sonner";

export const useProposalActions = ({
  setLoading,
  resetForm,
}: useProposalProps) => {
  const BEContract = useBEContract(true);
  const { address } = useAppKitAccount();

  const createProposal = useCallback(
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
        await BEContract.createProposal(
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
      } catch (error) {
        toast.error(await decodeError(error));
      } finally {
        if (resetForm) resetForm();
        setLoading(false);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, BEContract]
  );

  const voteProposal = useCallback(
    async (id: number) => {
      if (!id) {
        toast.error("Id required!");
        return;
      }
      if (!BEContract) {
        toast.error("Something went wrong!");
        return;
      }
      setLoading(true);
      try {
        await BEContract.vote(id);
        toast.success("Voting successful");
      } catch (error) {
        toast.error(await decodeError(error));
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [BEContract]
  );

  const executeProposal = useCallback(
    async (id: string) => {
      if (!id) {
        toast.error("Id required!");
        return;
      }
      if (!BEContract) {
        toast.error("Something went wrong!");
        return;
      }
      try {
        await BEContract.executeProposal(id);
        toast.success("Proposal executed");
      } catch (error) {
        toast.error(await decodeError(error));
      }
    },
    [BEContract]
  );

  return { createProposal, voteProposal, executeProposal };
};
