"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import BalancesWBTC from "../components/BalancesWBTC";
import { useAccount } from "wagmi";
import { HiSwitchVertical } from "react-icons/hi";

export default function Btcwbtc() {
  const { address } = useAccount();
  const [amount, setAmount] = useState(0);
  const [explain, setExplain] = useState(
    "Send your BTC on a special wallet tracked by Zetachain and receive wBTC on Zetachain"
  );
  const [from, setFrom] = useState("BTC");
  const [to, setTo] = useState("wBTC");
  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);
  const [direction, setDirection] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleAmountChange = (e: { target: { value: any } }) => {
    setAmount(Number(e.target.value));
  };

  const handleDirectionToggle = () => {
    setDirection(!direction);
    setFromBalance(0);
    setToBalance(0);

    if (direction) {
      setFrom("wBTC");
      setTo("BTC");
      setExplain("Send your wBTC and receive BTC on bitcoin");
    } else {
      setFrom("BTC");
      setTo("wBTC");
      setExplain(
        "Send your BTC on a special wallet tracked by Zetachain and receive wBTC on Zetachain"
      );
    }
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!amount || !address) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);

      const bitcoinTSSAddress = "tb1qy9pqmk2pd9sv63g27jt8r657wy0d9ueeh0nqur";
      const wallet = window?.xfi;

      if (wallet === undefined) {
        return alert("XDEFI wallet not found");
      }

      const account = (await wallet?.bitcoin?.getAccounts())?.[0];

      if (account === undefined) {
        return alert("No account found");
      }

      const recipient = address.replace(/^0x/, "");
      let memo = `hex::${recipient}`;

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
        (
          error: React.SetStateAction<string>,
          result: React.SetStateAction<string>
        ) => {
          setError(error);
          setResult(result);
        }
      );
    }
  };

  const renderContent = () => {
    if (!address) {
      return (
        <div className="section relative">
          <div className="py-7 px-24 text-white lg:w-[50%] w-[70%] wrapper shadow-2xl rounded-lg border-4 border-red-500 shadow-black flex justify-center">
            Connect your wallet to display information
          </div>
        </div>
      );
    }

    return (
      <div className="section relative">
        <div className="py-7 px-24 text-black lg:w-[50%] w-[70%] wrapper shadow-2xl rounded-lg border-4 border-black shadow-black">
          <div className="flex justify-center">{explain}</div>
          <div className="flex justify-start">From: {from}</div>
          <div className="flex justify-start">
            Blockchain:{" "}
            {direction ? (
              <img
                className="border border-black"
                src={"/zetachainLogo.jpg"}
                alt="logo zetachain"
                style={{ width: "40px", height: "40px" }}
              />
            ) : (
              <img
                className="border border-black"
                src={"/bitcoinLogo.png"}
                alt="logo bitcoin"
                style={{ width: "40px", height: "40px" }}
              />
            )}
          </div>
          <div>
            <BalancesWBTC address={address} />
          </div>
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            Amount in Satoshi (1 satoshi = 0.00000001 BTC):
            <input
              className="bg-transparent text-center border border-white rounded px-2 py-1 text-white w-full"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
            <button
              className="py-1 px-14 shadow-2xl font-bold shadow-black bg-white hover:bg-amber-600 rounded-lg"
              type="submit"
            >
              {"Receive " + (direction ? "BTC" : "wBTC")}
            </button>
          </form>
          <HiSwitchVertical onClick={handleDirectionToggle} />
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
          {!isFormValid && (
            <p className="text-red-500 mt-2">
              Please fill out all fields before submitting.
            </p>
          )}
          {error && (
            <div>
              <p className="text-red-500 mt-2">error: {error}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col relative">
      <Header />
      <main>{renderContent()}</main>
    </div>
  );
}
