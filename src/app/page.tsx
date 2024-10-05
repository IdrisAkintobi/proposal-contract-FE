import Home from "@/app/Home";
import Header from "@/components/Header";
import { ProposerProvider } from "@/context/ProposerContext";
import "@/util/init";
import { Toaster } from "sonner";

export default function App() {
  return (
    <ProposerProvider>
      <Header />
      <Home />
      <Toaster />
    </ProposerProvider>
  );
}
