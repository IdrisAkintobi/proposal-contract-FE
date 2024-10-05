import Home from "@/app/Home";
import { ProposerProvider } from "@/context/ProposerContext";
import "@/util/init";

export default function App() {
  return (
    <ProposerProvider>
      <Home />
    </ProposerProvider>
  );
}
