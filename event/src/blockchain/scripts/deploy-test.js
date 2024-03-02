
// const hre = require("hardhat");

async function main() {
    const lock = await hre.ethers.deployContract("EventTicketing");
  await lock.waitForDeployment();

  console.log(
    `Contract EventTicketing deployed to ${lock.target}`
  );
}  

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
