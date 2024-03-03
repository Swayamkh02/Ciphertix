require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const INFURA_PROJECT_ID = 'a26d60be9b734b6da908f91b3328c93e';
const GORELI_PRIVATE_KEY = 'a055ee968a758922b0d92c28e158686f908bdeb1a0fbb510a6a6e920d5e403ee';
module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      chainId: 31337,
    },
  },
  // networks:{
  //   goerli: {
  //     url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
  //     accounts: [GORELI_PRIVATE_KEY],
  //   },
  // },
};



// require("@nomiclabs/hardhat-waffle");

// const ALCHEMY_API_KEY = "aDqcpY5f5HCseei-6ONGC-5EajU7DhJ0";
// const SEPOLIA_PRIVATE_KEY =
//  "701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82";
// module.exports = {
//  solidity: "0.8.24",

//  networks: {
//    sepolia: {
//      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
//      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
//    },
//  },
// };