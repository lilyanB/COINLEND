"use client";

import React from "react";
import Header from "../components/Header";
import Image from "next/image";

export default function Contact() {
  // Define your project information
  const projectInfo = {
    name: "Coinlend",
    slogan: "Simplify Borrowing with ZetaChain",
    description:
      "Our mission is to simplify borrowing and lending in the world of cryptocurrency, making it accessible to everyone.",
    github: "https://coinlend.vercel.app/",
    zetachain: "https://www.zetachain.com/",
  };

  return (
    <div className="flex flex-col relative">
      <Header />
      <main>
        <div className="section relative">
          <div className="lg:w-[50%] w-[70%] wrapper">
            <div className="flex justify-center">
              <div className="text-center">
                <Image
                  src={"/logo.png"}
                  width={60}
                  height={40}
                  className="max-w-[200px] mx-auto"
                  alt={""}
                />
                <h1 className="text-2xl font-bold">{projectInfo.name}</h1>
                <p className="text-xl">{projectInfo.slogan}</p>
                <p className="text-lg">{projectInfo.description}</p>
                <a
                  href={projectInfo.github}
                  className="text-white hover:underline"
                >
                  Github
                </a>
                <a
                  href={projectInfo.zetachain}
                  className="text-white hover:underline"
                >
                  Zetachain
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
