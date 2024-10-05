"use client";

import {
  createContext,
  Dispatch,
  Fragment,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IProposer } from "../../util/proposal.interface";

interface ProposerContextInterface {
  proposals: IProposer[];
  setProposals?: Dispatch<SetStateAction<IProposer[]>>;
}

const defaultContext = {
  proposals: [],
};

const ProposerContext = createContext<ProposerContextInterface>(defaultContext);

// Hook to use the context
const useProposerContext = () => {
  const context = useContext(ProposerContext);
  if (!context.setProposals) {
    throw new Error(
      "useProposerContext must be used within an ProposerProvider"
    );
  }
  return context;
};

//Proposer provider component
const ProposerProvider = ({ children }: PropsWithChildren) => {
  const [proposals, setProposals] = useState<IProposer[]>([]);

  return (
    <Fragment>
      <ProposerContext.Provider value={{ proposals, setProposals }}>
        {children}
      </ProposerContext.Provider>
    </Fragment>
  );
};

export { ProposerProvider, useProposerContext };
