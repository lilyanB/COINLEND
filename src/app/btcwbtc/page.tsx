"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BalancesWBTC from "../components/BalancesWBTC";
import { useAccount } from "wagmi";
import { HiSwitchVertical } from "react-icons/hi";
import AddressBTC from "../components/AddressBTC";

export default function Btcwbtc() {
  const { address } = useAccount();
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("BTC");
  const [to, setTo] = useState("wBTC");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [direction, setDirection] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWBTCBalance() {
      try {
        setFromAddress((<AddressBTC />) as unknown as string);
        setToAddress(address as string);
      } catch (error) {
        console.error("Error fetching wBTC balance:", error);
      }
    }

    fetchWBTCBalance();
  }, [address]);

  const handleAmountChange = (e: { target: { value: any } }) => {
    setAmount(Number(e.target.value));
  };

  const handleDirectionToggle = () => {
    setDirection(!direction);

    if (direction) {
      setFrom("wBTC");
      setTo("BTC");
      setFromAddress(address as string);
      setToAddress((<AddressBTC />) as unknown as string);
    } else {
      setFrom("BTC");
      setTo("wBTC");
      setFromAddress((<AddressBTC />) as unknown as string);
      setToAddress(address as string);
    }
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!amount || !address) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);

      if (direction) {
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

          (error: any, result: any) => {
            if (error) {
              if (result.error === "XDEFI: user rejected the message signing") {
                setError("Transaction declined by the user");
              } else {
                setError("An error occurred during the transaction");
              }
            } else {
              setResult(result);
            }
          }
        );
      } else {
        console.log("transfer wBTC to receive BTC");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="section relative">
        {address ? (
          <div className="py-7 px-24 text-black lg:w-[50%] w-[70%] wrapper shadow-2xl rounded-lg border-4 border-black shadow-black">
            <div className="flex flex-col items-center">
              You have {<BalancesWBTC address={address} />} wBTC on Zetachain
              <h1 className="text-center mt-4 font-bold text-3xl">SWAP</h1>
            </div>
            <div className="flex justify-start">From: {from}</div>
            <div className="mx-auto">Address : {fromAddress}</div>
            <div className="flex flex-col justify-start">
              {!direction ? (
                <>
                  <span>Blockchain:</span>
                  <img
                    className="border border-black mx-auto"
                    src={"/zetachainLogo.jpg"}
                    alt="logo zetachain"
                    style={{ width: "40px", height: "40px" }}
                  />
                </>
              ) : (
                <>
                  <span>Blockchain:</span>
                  <img
                    className="border border-black mx-auto"
                    src={"/bitcoinLogo.png"}
                    alt="logo bitcoin"
                    style={{ width: "40px", height: "40px" }}
                  />
                </>
              )}
            </div>
            <form onSubmit={handleFormSubmit} className="flex flex-col">
              <span>Amount in Satoshi (1 satoshi = 0.00000001 BTC):</span>
              <input
                className="bg-transparent text-center border border-white rounded px-2 py-1 text-white w-full"
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
              <HiSwitchVertical
                onClick={handleDirectionToggle}
                className="text-4xl cursor-pointer mx-auto mt-4"
              />
              <div className="flex justify-start">To: {to}</div>
              <div className="">Address : {toAddress}</div>
              <div className="flex flex-col justify-start">
                {direction ? (
                  <>
                    <span>Blockchain:</span>
                    <img
                      className="border border-black mx-auto"
                      src={"/zetachainLogo.jpg"}
                      alt="logo zetachain"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </>
                ) : (
                  <>
                    <span>Blockchain:</span>
                    <img
                      className="border border-black mx-auto"
                      src={"/bitcoinLogo.png"}
                      alt="logo bitcoin"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </>
                )}
              </div>
              <button
                className="py-1 px-14 shadow-2xl font-bold shadow-black bg-white hover:bg-amber-600 rounded-lg mx-auto mt-4"
                type="submit"
              >
                {"Receive " + (direction ? "wBTC" : "BTC")}
              </button>
            </form>
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
        ) : (
          <div className="py-7 px-24 text-white lg:w-[50%] w-[70%] wrapper shadow-2xl rounded-lg border-4 border-red-500 shadow-black flex justify-center">
            Connect your wallet to display information
          </div>
        )}
      </div>
    </div>
  );
}
