import { useEffect, useState } from "react";
import { fetchBalance } from "@wagmi/core";

const BalancesWBTC = ({ address }: { address: string }) => {
  const [balanceWBTC, setBalanceWBTC] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the balance when the component mounts
    async function fetchWBTCBalance() {
      try {
        const response = await fetchBalance({
          address: `0x${address.replace(/^0x/i, "")}`,
          token: "0x65a45c57636f9bcced4fe193a602008578bca90b",
        });
        const balance = parseFloat(response.formatted); // Parse the formatted balance to a number
        setBalanceWBTC(balance);
      } catch (error) {
        console.error("Error fetching wBTC balance:", error);
      }
    }

    fetchWBTCBalance();
  }, [address]);

  return (
    <div>
      <p>Your address: {address}</p>
      {balanceWBTC !== null ? (
        <p>You have {balanceWBTC} wBTC</p>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
};

export default BalancesWBTC;
