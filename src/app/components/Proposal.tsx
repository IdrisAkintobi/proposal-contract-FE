import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProposalActions } from "@/hooks/useProposalActions";
import { IProposer } from "@/util/proposal.interface";
import { useState } from "react";

const Proposal: React.FC<IProposer> = ({
  proposalId,
  description,
  amount,
  minRequiredVote,
  voteCount,
  votingDeadline,
  executed,
}) => {
  const [loading, setLoading] = useState(false);
  const { voteProposal, executeProposal } = useProposalActions({ setLoading });

  const canVote = new Date(votingDeadline).getTime() < Date.now() || !executed;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="p-4 bg-gray-100 border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Proposal Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between">
          <p className="text-gray-600">Description:</p>
          <span className="font-bold text-gray-800">{description}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Amount:</p>
          <span className="font-bold text-gray-800">{amount} ETH</span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Required Vote:</p>
          <span className="font-bold text-gray-800">{minRequiredVote}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Vote Count:</p>
          <span className="font-bold text-gray-800">{voteCount}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Deadline:</p>
          <span className="font-bold text-gray-800">{votingDeadline}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Executed:</p>
          <span className="font-bold text-gray-800">{String(executed)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between w-[100%]">
        <Button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 min-w-[20%] rounded-md"
          disabled={loading || executed}
          onClick={() => executeProposal(Number(proposalId))}
        >
          Execute
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 min-w-[20%] rounded-md"
          disabled={loading || !canVote}
          onClick={() => voteProposal(Number(proposalId))}
        >
          Vote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Proposal;
