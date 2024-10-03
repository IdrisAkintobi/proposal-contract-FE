import { IProposer } from "@/util/proposal.interface";
import Proposal from "./Proposal";

interface ProposalsProps {
  proposals: IProposer[];
}

const Proposals: React.FC<ProposalsProps> = ({ proposals }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {proposals.length === 0 ? (
        <span className="text-gray-600 text-center col-span-full">
          No proposals available
        </span>
      ) : (
        proposals.map(
          ({
            votingDeadline,
            minRequiredVote,
            amount,
            description,
            executed,
            voteCount,
          }) => (
            <Proposal
              key={`${votingDeadline}${minRequiredVote}`}
              amount={amount}
              votingDeadline={votingDeadline}
              description={description}
              executed={executed}
              minRequiredVote={minRequiredVote}
              voteCount={voteCount}
            />
          )
        )
      )}
    </div>
  );
};

export default Proposals;
