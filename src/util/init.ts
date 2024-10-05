"use client";

import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { sepolia } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const liskSepolia = {
  id: "eip155:4202",
  chainId: 4202,
  chainNamespace: "eip155",
  name: "Lisk Sepolia",
  currency: "ETH",
  explorerUrl: process.env.NEXT_PUBLIC_LISK_SEPOLIA_EXPLORER_URL!,
  rpcUrl: process.env.NEXT_PUBLIC_LISK_SEPOLIA_RPC_URL!,
} as const;

const holesky = {
  id: "eip155:17000",
  chainId: 17000,
  chainNamespace: "eip155",
  name: "Holesky",
  currency: "ETH",
  explorerUrl: process.env.NEXT_PUBLIC_HOLESKY_EXPLORER_URL!,
  rpcUrl: process.env.NEXT_PUBLIC_HOLESKY_RPC_URL!,
} as const;

export const allowedNetworks = [liskSepolia, sepolia, holesky];

export const metadata = {
  name: "Reown Connect",
  description: "Website that implements reown wallet connect",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks: allowedNetworks,
  projectId,
  metadata,
  allowUnsupportedChain: true,
  enableEIP6963: true,
  features: {
    analytics: false,
    email: false,
    allWallets: false,
    socials: [],
  },
});
