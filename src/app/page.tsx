"use client";

import { Toaster } from "sonner";
import Home from "../app/Home";
import "../util/init";
import Header from "./components/Header";
import { ProposerProvider } from "./context/ProposerContext";

export default function App() {
  return (
    <ProposerProvider>
      <Header />
      <Home />
      <Toaster />
    </ProposerProvider>
  );
}
