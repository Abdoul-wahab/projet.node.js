const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = process.env.NFT_API_SERVER_URL;
const appId = process.env.NFT_API_APP_ID;
const moralisSecret = process.env.NFT_API_MORALIS_SECRET;

const web3API = async () => {
  return await Moralis.start({ serverUrl, appId, moralisSecret });
};

module.exports = {
  web3API
}