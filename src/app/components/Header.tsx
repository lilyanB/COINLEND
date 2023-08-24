import Image from "next/image";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={40}
            height={40}
            className="mr-12"
            alt={""}
          />
        </Link>
      </div>

      {/* links Div  */}
      <ul className="flex  flex-row justify-center items-center">
        <li className="li">
          <Link href={"/btc"}>BTC</Link>
        </li>
        <li className="li">
          <Link href={"/lendborrow"}>Lending and Borring</Link>
        </li>
        <li className="li">
          <Link href={"/wbtc"}>wBTC</Link>
        </li>
      </ul>

      {/* last div  */}
      <div className="flex items-center flex space-x-4">connect</div>
    </div>
  );
};

export default Header;
