import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: LinkButtonProps) => (
  <li className="li py-1 px-14 shadow-2xl font-bold shadow-black bg-white hover:bg-amber-600 rounded-lg">
    <Link href={href}>{children}</Link>
  </li>
);

const Header = () => {
  return (
    <header>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              width={40}
              height={40}
              className="mr-12"
              alt={""}
              style={{ width: "40px", height: "40px" }}
            />
          </Link>
        </div>

        {/* links Div  */}
        <ul className="flex flex-row justify-center items-center space-x-4">
          <NavLink href={"/btcwbtc"}>BTC/wBTC</NavLink>
          <NavLink href={"/lendborrow"}>Protocol</NavLink>
          <NavLink href={"/contact"}>Contact us</NavLink>
        </ul>

        {/* last div  */}
        <div className="flex items-center">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
