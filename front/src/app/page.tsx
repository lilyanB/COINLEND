import React from "react";
import Link from "next/link";
import Image from "next/image";

declare global {
  interface Window {
    xfi: any;
  }
}

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
}

function LinkButton({ href, children }: LinkButtonProps) {
  return (
    <Link href={href}>
      <div className="py-7 px-24 text-lg shadow-2xl font-bold shadow-black bg-white hover:bg-amber-600 rounded-lg border-4 border-black">
        {children}
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-40">
          <div className="pt-7 bg-white rounded-md shadow-2xl border-x-2 border-t-2 border-b-1 border-black text-center">
            <div className="py-7 px-24 bg-white rounded-md shadow-2xl border-2 border-black text-center">
              <h1 className="pb-4 text-4xl font-bold">BitLend</h1>
              <p className="text-sm italic">Lending protocol on Bitcoin</p>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-16">
            {/* Liens */}
            <LinkButton href={"/btcwbtc"}>BTC/wBTC</LinkButton>
            <LinkButton href={"/lendborrow"}>Protocol</LinkButton>
            <LinkButton href={"/contact"}>Contact us</LinkButton>
          </div>
        </div>
        <a
          href="#description"
          className="absolute bottom-0 left-0 ml-4 mb-4 cursor-pointer"
        >
          <Image
            src={"/fleche.png"}
            width={40}
            height={40}
            alt={""}
            style={{ width: "40px", height: "40px" }}
          />
        </a>
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div
          id="description"
          className="text-white text-5xl text-center text-justify w-11/12"
        >
          This project is intended for the Zetachain Hackathon. We tried to
          implement a lending and borrowing protocol for the Bitcoin blockchain.
          To do this, we&apos;ve made full use of the capabilities that
          Zetachain gives us via its technologies. The project is just a first
          version that we hope to be able to refine. We hope you&apos;ll enjoy
          the experience.
        </div>
      </div>
    </main>
  );
}
