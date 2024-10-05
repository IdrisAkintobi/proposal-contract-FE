import { useProposerContext } from "@/context/ProposerContext";
import { useBEContract } from "@/hooks/useContract";
import { mapProposalToUIData } from "@/util/util-functions";
import { useCallback, useEffect } from "react";

export const useStartListener = () => {
  const BEContract = useBEContract();
  const { setProposals } = useProposerContext();

  const proposalCreatedHandler = useCallback(
    (
      proposalId: bigint,
      description: string,
      _: string,
      amount: number,
      votingDeadline: number,
      minVotesToPass: number
    ) => {
      const proposal = mapProposalToUIData({
        proposalId,
        description,
        amount,
        votingDeadline,
        minVotesToPass,
        voteCount: 0,
        executed: false,
      });
      setProposals!((prev) => [...prev, proposal]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const votedHandler = useCallback((proposalId: bigint) => {
    setProposals!((prev) => {
      const newProposals = [...prev];
      for (let i = 0; i < newProposals.length; i++) {
        const curr = newProposals[i];
        if (curr.proposalId === Number(proposalId)) {
          newProposals[i] = { ...curr, voteCount: curr.voteCount + 1 };
          break;
        }
      }
      return newProposals;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!BEContract) return;

    BEContract.addListener("Voted", votedHandler);
    BEContract.addListener("ProposalCreated", proposalCreatedHandler);

    return () => {
      BEContract.removeListener("Voted", votedHandler);
      BEContract.removeListener("ProposalCreated", proposalCreatedHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BEContract]);
};
