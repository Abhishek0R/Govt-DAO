const hre = require("hardhat");

//* How to change this file
/*
- Fill in the `ContractName` with your contract name.
- Uncomment the verification process if you want to verify your contract but make sure to uncomment the same in the `hardhat.config.js` and change the values as required.

You can pass in values into your contract like doing the following :
ex : Asssume you have a string and a number to pass
` const lock = await Lock.deploy("hello", 5);`
*/

//* Sample Deployment
/*
  const Lock = await hre.ethers.getContractFactory("ContractName");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log("Contract Deployed to : ", lock.address);

  console.log("Sleeping...");
  await sleep(50000);
  await hre.run("verify:verify", {
    address: lock.address,
    constructorArguments: [],
  });
*/

async function main() {
  // Write your deployment files here
  const GDTokenContract = await ethers.getContractFactory("GDToken");
  const gdtokencontract = await GDTokenContract.deploy();
  await gdtokencontract.deployed();

  console.log("GDToken contract address:", gdtokencontract.address);

  const DAOContract = await ethers.getContractFactory("DAO");
  const daocontract = await DAOContract.deploy(gdtokencontract.address, {
    value: ethers.utils.parseEther("0.001"),
  });
  await daocontract.deployed();

  console.log("DAO contract address: ", daocontract.address);
}

// Async Sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
