"use client";

import CreateProposalModal from "@/components/CreateProposal";
import Proposals from "@/components/Proposals";
import { useProposerContext } from "@/context/ProposerContext";
import { useStartListener } from "@/hooks/startListeners";
import { useGetProposal } from "@/hooks/useGetProposal";
import "@/util/init";
import { Fragment } from "react";

export default function Home() {
  const { loading } = useGetProposal();
  const { proposals } = useProposerContext();
  useStartListener();
  return (
    <Fragment>
      <div className="flex justify-between items-center px-8 py-4 bg-gray-100 border-b">
        <h1 className="text-xl font-bold text-gray-800">Proposals</h1>
        <CreateProposalModal />
      </div>

      <main className="flex flex-col gap-8 px-8 py-4 min-h-screen">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <Proposals proposals={proposals} />
        )}
      </main>

      <footer className="flex justify-center items-center gap-4 py-6 bg-gray-100">
        <p className="text-gray-600">© 2024 Proposal Management</p>
      </footer>
    </Fragment>
  );
}
