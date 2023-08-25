"use client";

import React, { useState } from "react";
import Header from "../components/Header";

export default function Btc() {
  const [amount, setAmount] = useState(0);
  const [address, setAddress1] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const handleAmountChange = (e: { target: { value: any } }) => {
    setAmount(Number(e.target.value));
  };

  const handleAddress1Change = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAddress1(e.target.value);
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!amount || !address) {
      setIsFormValid(false);
    } else {
      console.log("Amount:", amount);
      console.log("Address 1:", address);
      setIsFormValid(true);

      const bitcoinTSSAddress = "tb1qy9pqmk2pd9sv63g27jt8r657wy0d9ueeh0nqur";
      const wallet = window?.xfi;
      if (wallet === undefined) return alert("XDEFI wallet not found");

      const account = (await wallet?.bitcoin?.getAccounts())?.[0];
      if (account === undefined) return alert("No account found");
      console.log("account : ", account);

      const recipient = address.replace(/^0x/, "");
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
          console.log(error, result);
        }
      );
    }

    return false;
  };

  return (
    <div className="body bg-[#111524] flex flex-col relative">
      <Header />
      <main>
        <div className="section relative">
          <div className="lg:w-[50%] w-[70%] wrapper">
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
                value={address}
                onChange={handleAddress1Change}
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
          </div>
        </div>
      </main>
    </div>
  );
}
