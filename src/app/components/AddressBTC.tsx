import { useEffect, useState } from "react";

const AddressBTC = () => {
  const [accountBTC, setAccountBTC] = useState<string | null>(null);
  const wallet = window?.xfi;

  useEffect(() => {
    // Fetch the balance when the component mounts
    async function fetchBTCBalance() {
      try {
        if (wallet === undefined) {
          return alert("XDEFI wallet not found");
        }

        const account = (await wallet?.bitcoin?.getAccounts())?.[0];

        if (account === undefined) {
          return alert("No account found");
        }
        setAccountBTC(account);
      } catch (error) {
        console.error("Error fetching wBTC balance:", error);
      }
    }
    fetchBTCBalance();
  }, []);

  return accountBTC;
};

export default AddressBTC;
