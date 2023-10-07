import Header from "../components/Header";
import Link from "next/link";

export default function Lendborrow() {
  return (
    <div className="flex flex-col relative">
      <Header />
      <main>
        <div className="section relative">
          <div className="lg:w-[50%] w-[70%] wrapper">
            <div className="">
              Coming soon. You can see the current{' '}
              <Link href="https://github.com/lilyanB/coinlend/blob/master/contracts/contracts/LendingAndBorrowing.sol"
                target="_blank"
                className="text-white hover:underline"
              >
                contracts
              </Link>
              {'.'}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
