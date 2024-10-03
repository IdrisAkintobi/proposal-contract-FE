import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Eip1193Provider, JsonRpcSigner } from "ethers";
import { useEffect, useMemo, useState } from "react";

// Define the types for the return values of useRunners
interface UseRunnersReturn {
  signer: JsonRpcSigner | null;
}

export const useRunners = (): UseRunnersReturn => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const { walletProvider } = useAppKitProvider<Eip1193Provider>("eip155");

  // Memoized provider based on walletProvider availability
  const provider = useMemo<BrowserProvider | null>(
    () => (walletProvider ? new BrowserProvider(walletProvider) : null),
    [walletProvider]
  );

  // Update signer when provider changes
  useEffect(() => {
    provider?.getSigner().then((newSigner) => {
      if (!signer) {
        setSigner(newSigner);
        return;
      }

      if (newSigner.address === signer.address) {
        return;
      }

      setSigner(newSigner);
    });
  }, [provider, signer]);

  return { signer };
};
