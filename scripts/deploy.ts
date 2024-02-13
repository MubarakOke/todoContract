import { ethers } from "hardhat";

async function main() {
  const ToDo = await ethers.deployContract("ToDo");

  await ToDo.waitForDeployment();

  console.log(`ToDo contract deployed to ${ToDo.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
