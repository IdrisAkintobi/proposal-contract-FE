import { getStaticProvider } from "@/util/static.providers";
import { useAppKitNetwork } from "@reown/appkit/react";
import { Contract, InterfaceAbi } from "ethers";
import { useMemo } from "react";
import ABI from "../../ABI/proposal.json";
import { useRunners } from "./useRunners";

interface useCustomContractParams {
  address: string;
  abi: InterfaceAbi;
}

export const useBEContract = (withSigner = false): Contract | null => {
  const { signer } = useRunners();
  const { caipNetwork } = useAppKitNetwork();
  const BEContractAddress = process.env
    .NEXT_PUBLIC_BE_CONTRACT_ADDRESS as string;

  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null; // Avoid rerender if signer is not available
      return new Contract(BEContractAddress, ABI, signer);
    }

    const staticProvider = getStaticProvider(caipNetwork?.name);
    if (!staticProvider) return null;
    return new Contract(BEContractAddress, ABI, staticProvider);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caipNetwork?.name, signer?.address]);
};

export const useCustomContract = (
  params: useCustomContractParams
): Contract | null => {
  const { abi, address } = params;
  const { caipNetwork } = useAppKitNetwork();

  return useMemo(() => {
    if (!abi || !address) return null;

    const staticProvider = getStaticProvider(caipNetwork?.name);
    if (!staticProvider) return null;
    return new Contract(address, abi, staticProvider);
  }, [abi, address, caipNetwork?.name]);
};
