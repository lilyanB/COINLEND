"use client";

import BalancesWBTC from "../components/BalancesWBTC";
import Header from "../components/Header";
import { useAccount } from "wagmi";

export default function Wbtc() {
  const { address } = useAccount();

  return (
    <div className="body bg-[#111524] flex flex-col relative">
      <main>
        <Header />
      </main>
      wbtc
      {address && <BalancesWBTC address={address} />}
    </div>
  );
}
