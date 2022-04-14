const express = require('express');
const Controllers = require('../controller/index');
const isAdmin = require("../middleware/isAdmin")


class RouterClass {
    constructor({ passport }){
        this.router = express.Router();
        this.passport = passport;
    }

    routes() {

        this.router.get('/', (req, res) => {
            return res.json({ msg: "Hello API" })
        })

        /**
         * 
         * 
         * Collections Routes
         * 
         *  */ 

        // Create
        this.router.post('/collections', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            Controllers.collection.createOne(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        // Read ALl
        this.router.get('/collections', (req, res) => {
            Controllers.collection.readAll()
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        // Get One
        this.router.get('/collections/:id', (req, res) => {
            Controllers.collection.readOne(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        // Update
        this.router.put('/collections/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            Controllers.collection.updateOne(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        // Delete
        this.router.delete('/collections/:id', this.passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {
            Controllers.collection.deleteOne(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })


         /**
         * 
         * 
         * Nfts Routes
         * 
         *  */ 


        // Create
        this.router.post('/nfts/:collectionId', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            Controllers.nft.addNftToCollection(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /* Search NFTs with Moralis API */
        this.router.get('/nfts', (req, res) => {
            Controllers.nft.searchNFTs(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        
         /* get Nft Metadata with Moralis API */
        this.router.get('/nfts/:address/metadata', (req, res) => {
            Controllers.nft.getNftMetadata(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /* get Nft Owners with Moralis API */
        this.router.get('/nfts/:address/owners', (req, res) => {
            Controllers.nft.getNftOwners(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

         /* get Nft Trades with Moralis API */
        this.router.get('/nfts/:address/trades', (req, res) => {
            Controllers.nft.getNftTrades(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /* get Nft Transfers with Moralis API */
        this.router.get('/nfts/:address/transfers', (req, res) => {
            Controllers.nft.getNftTransfers(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /* Get NFTs For Contract with Moralis API */
        this.router.get('/nfts/:address/:token_address', (req, res) => {
            Controllers.nft.getNftsForContract(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /* remove Nft From Collection with Moralis API */
        this.router.delete('/nfts/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            Controllers.nft.removeNftFromCollection(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

         /* Read All added nfts with */
         this.router.get('/all-nfts', (req, res) => {
            Controllers.nft.readAll()
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })


        /**
         * 
         * 
         * Comments Routes
         * 
         *  */

        // Create
        this.router.post('/comments', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            Controllers.comment.createOne(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        // Read ALl
        this.router.get('/comments', (req, res) => {
            Controllers.comment.readAll()
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        // Get One
        this.router.get('/comments/:id', (req, res) => {
            Controllers.comment.readOne(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        // Update
        this.router.put('/comments/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
            Controllers.comment.updateOne(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        // Delete
        this.router.delete('/comments/:id', this.passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {
            Controllers.comment.deleteOne(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        

    }

    init() {
        this.routes();
        return this.router;
    }
}

module.exports = RouterClass;