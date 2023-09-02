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
      <div className="section relative">
        <div className="lg:w-[50%] w-[70%] wrapper">
          <div className="flex justify-center">
            Send your wBTC and receive BTC on bitcoin
          </div>
          <div>
            {address && <BalancesWBTC address={address} />}
            {!address && (
              <div className="flex justify-center text-red-500">
                Connect your wallet to display informations
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
