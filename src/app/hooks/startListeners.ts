import { mapProposalToUIData } from "@/util/util-functions";
import { useCallback, useEffect } from "react";
import { useProposerContext } from "../context/ProposerContext";
import { useBEContract } from "./useContract";

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
      const proposal = newProposals.find(
        (i) => i.proposalId === Number(proposalId)
      );
      if (proposal?.voteCount) proposal.voteCount += 1;
      return newProposals;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!BEContract) return;

    BEContract.on("ProposalCreated", proposalCreatedHandler);
    BEContract.on("Voted", votedHandler);

    return () => {
      BEContract.off("ProposalCreated", proposalCreatedHandler);
      BEContract.off("Voted", votedHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BEContract]);
};
