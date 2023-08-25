"use client";

import React, { useState } from "react";
import Header from "../components/Header";

export default function Btc() {
  const [amount, setAmount] = useState(0);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleAmountChange = (e: { target: { value: any } }) => {
    setAmount(Number(e.target.value));
  };

  const handleAddress1Change = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAddress1(e.target.value);
  };

  const handleAddress2Change = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAddress2(e.target.value);
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Amount:", amount);
    console.log("Address 1:", address1);
    console.log("Address 2:", address2);
  };

  return (
    <div className="body bg-[#111524] flex flex-col relative">
      <Header />
      <main>
        <div className="section relative">
          <div className="lg:w-[30%] w-[50%] wrapper">
            <form onSubmit={handleFormSubmit} className="flex flex-col">
              Amount:
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
                onChange={handleAddress1Change}
              />
              Address 2:
              <input
                className="bg-transparent text-center border border-white rounded px-2 py-1 text-white w-full"
                type="text"
                value={address2}
                onChange={handleAddress2Change}
              />
              <button
                className="border border-white rounded-lg px-4 py-2 text-white mt-4"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
