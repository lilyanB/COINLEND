"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  Chain,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, base, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { xdefiWallet } from "@rainbow-me/rainbowkit/wallets";

const zetachain: Chain = {
  id: 7001,
  name: "Zetachain",
  network: "zetachain",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Zetachain",
    symbol: "aZETA",
  },
  rpcUrls: {
    public: {
      http: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"],
    },
    default: {
      http: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"],
    },
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://zetachain-athens-3.blockscout.com/",
    },
    etherscan: {
      name: "SnowTrace",
      url: "https://zetachain-athens-3.blockscout.com/",
    },
  },
  testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    zetachain,
    mainnet,
    polygon,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = "4553aed4455ed3718b9271d2c9519377";
console.log(projectId);

const { wallets } = getDefaultWallets({
  appName: "coinlend",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "coinlend",
};

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [xdefiWallet({ chains })],
  },
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
