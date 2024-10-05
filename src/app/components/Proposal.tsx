import { IProposer } from "../../util/proposal.interface";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Proposal: React.FC<IProposer> = ({
  description,
  amount,
  minRequiredVote,
  voteCount,
  votingDeadline,
  executed,
}) => {
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
      <CardFooter className="p-4">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
          Vote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Proposal;
