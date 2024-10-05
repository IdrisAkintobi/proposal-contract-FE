import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useCreateProposal } from "../hooks/useCreateProposal";

const DEFAULT_MIN_VOTE = Number(process.env.NEXT_PUBLIC_DEFAULT_MIN_VOTE) || 2;
const defaultState = {
  description: "",
  recipient: "",
  amount: "",
  duration: "",
  minVote: DEFAULT_MIN_VOTE,
};

const CreateProposalModal = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ ...defaultState });

  const resetForm = () => setState({ ...defaultState });

  const handleCreateProposal = useCreateProposal({ setLoading, resetForm });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const { amount, duration, description, minVote, recipient } = state;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-blue-500">
          Create Proposal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Proposal</DialogTitle>
          <DialogDescription>
            Provide the details for your proposal below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recipient" className="text-right">
              Recipient
            </Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              value={amount}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              value={duration}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minVote" className="text-right">
              Min Required Votes
            </Label>
            <Input
              id="minVote"
              value={minVote}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="w-full">
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              disabled={loading}
              className="bg-orange-500 float-left"
            >
              Close
            </Button>
          </DialogTrigger>
          <Button
            className="bg-blue-500"
            variant="default"
            disabled={loading}
            onClick={() => handleCreateProposal({ ...state })}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProposalModal;
