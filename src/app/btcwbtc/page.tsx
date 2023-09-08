"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import BalancesWBTC from "../components/BalancesWBTC";
import { useAccount } from "wagmi";

export default function Btcwbtc() {
  const { address } = useAccount();
  const [amount, setAmount] = useState(0);
  const [address1, setAddress] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleAmountChange = (e: { target: { value: any } }) => {
    setAmount(Number(e.target.value));
  };

  const handleAddressChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAddress(e.target.value);
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!amount || !address1) {
      setIsFormValid(false);
    } else {
      console.log("Amount:", amount);
      console.log("Address 1:", address1);
      setIsFormValid(true);

      const bitcoinTSSAddress = "tb1qy9pqmk2pd9sv63g27jt8r657wy0d9ueeh0nqur";
      const wallet = window?.xfi;
      if (wallet === undefined) return alert("XDEFI wallet not found");

      const account = (await wallet?.bitcoin?.getAccounts())?.[0];
      if (account === undefined) return alert("No account found");
      console.log("account : ", account);

      const recipient = address1.replace(/^0x/, "");
      console.log("recipient : ", recipient);

      let memo = `hex::${recipient}`;
      console.log("memo : ", memo);

      window.xfi.bitcoin.request(
        {
          method: "transfer",
          params: [
            {
              feeRate: 10,
              from: account,
              recipient: bitcoinTSSAddress,
              amount: {
                amount,
                decimals: 8,
              },
              memo,
            },
          ],
        },
        (error: any, result: any) => {
          setError(error);
          setResult(result);
        }
      );
    }

    return false;
  };

  return (
    <div className="flex flex-col relative">
      <Header />
      <main>
        <div className="section relative">
          <div className="lg:w-[50%] w-[70%] wrapper">
            <div className="flex justify-center">
              Send your BTC on a special wallet tracked by Zetachain and receive
              wBTC on Zetachain
            </div>
            <form onSubmit={handleFormSubmit} className="flex flex-col">
              Amount in Satoshi (1 satoshi = 0.00000001 BTC):
              <input
                className="bg-transparent text-center border border-white rounded px-2 py-1 text-white w-full"
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
              Address 1:
              <input
                className="bg-transparent text-center border border-white rounded px-2 py-1 text-white w-full"
                type="text"
                value={address1}
                onChange={handleAddressChange}
              />
              <button
                className="border border-white rounded-lg px-4 py-2 text-white mt-4"
                type="submit"
              >
                Submit
              </button>
            </form>
            {!isFormValid && (
              <p className="text-red-500 mt-2">
                Please fill out all fields before submitting.
              </p>
            )}
            {result && (
              <div>
                <p className="text-white mt-2">
                  Your transaction on Bitcoin Testnet:
                  <a
                    href={`https://live.blockcypher.com/btc-testnet/tx/${result}`}
                    target="_blank"
                    className="ml-2 text-green-500"
                  >
                    {result}
                  </a>
                </p>
              </div>
            )}
            {error && (
              <div>
                <p className="text-red-500 mt-2">error: {error}</p>
              </div>
            )}
          </div>
        </div>
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
      </main>
    </div>
  );
}
