
const Models = require('../models/index');
const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = process.env.NFT_API_SERVER_URL;
const appId = process.env.NFT_API_APP_ID;
const moralisSecret = process.env.NFT_API_MORALIS_SECRET;

    const searchNFTs = (req) => {
      return new Promise( async (resolve, reject) => {
          await Moralis.start({ serverUrl, appId, moralisSecret });
          const options = { q: req.query.q};
          const NFTs = await Moralis.Web3API.token.searchNFTs(options);
          if(NFTs) return resolve(NFTs)
          return reject('error')
      })
    }

    const web3API = async () => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
      
        const price = await Moralis.Web3API.token.getTokenPrice({
          address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          chain: "bsc",
        });
        console.log(price);
    };

    const addNftToCollection = (req) => {
      return new Promise( (resolve, reject) => {
      
          req.body.author = req.user._id;
          req.body.isPartOf = req.params.collectionId;

          Models.nft.create(req.body)
          .then( async nftData => {
              await Models.collection.findByIdAndUpdate(req.params.collectionId, { $push: { nfts: nftData._id } })
              return resolve({ nft: nftData })
          })
          .catch( nftError => reject(nftError) )
      })
    };

    const removeNftFromCollection = (req) => {
      return new Promise( (resolve, reject) => {
        Models.nft.deleteOne({ _id: req.params.id }, (err, data) => {
          return err
          ? reject(err)
          : resolve(data)
        })
      })
    };


    const getNftMetadata = (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        const options = { address: req.params.address};
        const data = await Moralis.Web3API.token.getNFTMetadata(options);
        if(data) return resolve(data)
        return reject('error')
      })
    };

    const getNftOwners = (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        const options = { address: req.params.address};
        const data = await Moralis.Web3API.token.getNFTOwners(options);
        if(data) return resolve(data)
        return reject('error')
      })
    };

    const getNftTrades = (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        const options = { address: req.params.address};
        const data = await Moralis.Web3API.token.getNFTTrades(options);
        if(data) return resolve(data)
        return reject('error')
      })
    };

    const getNftTransfers = (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        const options = { address: req.params.address};
        const data = await Moralis.Web3API.account.getNFTTransfers(options);
        if(data) return resolve(data)
        return reject('error')
      })
    };


    const getNftsForContract = (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        const options = { address: req.params.address, token_address: req.params.token_address };
        const data = await Moralis.Web3API.account.getNFTsForContract(options);
        if(data) return resolve(data)
        return reject('error')
      })
    };

    const readAll = () => {
      return new Promise( (resolve, reject) => {
          Models.nft.find( (err, data) => {
              return err
              ? reject(err)
              : resolve(data)
          })
      })
    }

    module.exports = {
      addNftToCollection,
      removeNftFromCollection,
      getNftTrades,
      getNftMetadata,
      getNftOwners,
      getNftsForContract,
      getNftTransfers,
      searchNFTs,
      web3API,
      readAll
    }