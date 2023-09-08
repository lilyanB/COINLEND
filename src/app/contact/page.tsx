"use client";

import React, { useState } from "react";
import Header from "../components/Header";

export default function Contact() {
  return (
    <div className="flex flex-col relative">
      <Header />
      <main>
        <div className="section relative">
          <div className="lg:w-[50%] w-[70%] wrapper">
            <div className="flex justify-center">contact us</div>
          </div>
        </div>
      </main>
    </div>
  );
}
