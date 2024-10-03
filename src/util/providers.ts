import { sepolia } from "@reown/appkit/networks";
import { JsonRpcProvider } from "ethers";

type SupportedNetwork = "Lisk Sepolia" | "Holesky" | "Sepolia";

const liskProvider = new JsonRpcProvider(
  process.env.NEXT_PUBLIC_LISK_SEPOLIA_RPC_URL
);

const sepoliaProvider = new JsonRpcProvider(sepolia.rpcUrl);

const holeskyProvider = new JsonRpcProvider(
  process.env.NEXT_PUBLIC_HOLESKY_RPC_URL
);

export const getStaticProvider = (name: SupportedNetwork) => {
  switch (name) {
    case "Lisk Sepolia":
      return liskProvider;
    case "Sepolia":
      return sepoliaProvider;
    case "Holesky":
      return holeskyProvider;
    default:
      throw new Error(`Unsupported network: ${name}`);
  }
};
