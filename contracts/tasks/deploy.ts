import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  if (hre.network.name !== "zeta_testnet") {
    throw new Error(
      '🚨 Please use the "zeta_testnet" network to deploy to ZetaChain.'
    );
  }

  const [signer] = await hre.ethers.getSigners();
  if (signer === undefined) {
    throw new Error(
      `Wallet not found. Please, run "npx hardhat account --save" or set PRIVATE_KEY env variable (for example, in a .env file)`
    );
  }
  console.log(`🔑 Using account: ${signer.address}\n`);

  
  const lar = await hre.ethers.getContractFactory("LARToken");
  const LAR = await lar.deploy();
  await LAR.deployed();

  console.log(`🚀 Successfully deployed contract on ZetaChain.
📜 Contract address: ${LAR.address}
🌍 Explorer: https://athens3.explorer.zetachain.com/address/${LAR.address}
`);

  const factory = await hre.ethers.getContractFactory("LendingAndBorrowing");
  const contract = await factory.deploy(LAR.address);
  await contract.deployed();

  console.log(`🚀 Successfully deployed contract on ZetaChain.
📜 Contract address: ${contract.address}
🌍 Explorer: https://athens3.explorer.zetachain.com/address/${contract.address}
`);
};

task("deploy", "Deploy the contract", main);
