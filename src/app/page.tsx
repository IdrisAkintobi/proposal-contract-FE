import "../util/init";
import { ProposerProvider } from "./context/ProposerContext";
import Home from "./Home";

export default function App() {
  return (
    <ProposerProvider>
      <Home />
    </ProposerProvider>
  );
}
