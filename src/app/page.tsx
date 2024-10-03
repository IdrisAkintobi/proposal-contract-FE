"use client";

import { Fragment } from "react";
import "../util/init";
import CreateProposalModal from "./components/CreateProposal";
import Proposals from "./components/Proposals";
import { useGetProposal } from "./hooks/useGetProposal";

export default function Home() {
  const { proposals, loading } = useGetProposal();
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
