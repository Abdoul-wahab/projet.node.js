const express = require('express');
const Controllers = require('../controller/index');
const isAdmin = require("../middleware/isAdmin")
const { checkSchema, validationResult} = require('express-validator');
const Models = require('../models/index')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


class RouterClass {
    constructor({ passport }){
        this.router = express.Router();
        this.passport = passport;

        this.validationSchema = {
            collection: {
                name: {
                    isString: true,
                    notEmpty: true,
                },
                description: {
                    isString: true,           
                    notEmpty: true,
                },
            },
            nft: {
                token_address: {
                    notEmpty: true,
                    isString: true,
                    custom: {
                        options: value => {
                            return Models.nft.find({
                                token_address: value
                            }).then(nft => {
                                if (nft.length > 0) {
                                    return Promise.reject('this nft has already been added')
                                }
                            })
                        }
                    }
                },
                token_hash: {
                    notEmpty: true,
                    isString: true,
                    errorMessage: "token_hash field cannot be empty"
                },
                contract_type: {
                    notEmpty: true,
                    isString: true,
                    errorMessage: "contract_type field cannot be empty"
                },
            },
            comment: {
                content: {
                    isString: true,
                    notEmpty: true,
                }
            },
            stripe: {
                "items.*.address": {
                    notEmpty: true,
                    isString: true,
                    custom: {
                        options: value => {
                            return Models.nft.find({
                                token_address: value
                            }).then(nft => {
                                if (nft.length <= 0) {
                                    return Promise.reject('nft not found')
                                }
                            })
                        }
                    }
                },
            },
        }
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
        this.router.post('/collections', 
            this.passport.authenticate('jwt', { session: false }),
            checkSchema(this.validationSchema.collection), 
            (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array()
                    });
                }
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
        this.router.put('/collections/:id', 
            this.passport.authenticate('jwt', { session: false }), 
            checkSchema(this.validationSchema.collection),
            (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array()
                    });
                }
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
        this.router.post('/nfts/:collectionId', 
            this.passport.authenticate('jwt', { session: false }), 
            checkSchema(this.validationSchema.nft),
            (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array()
                    });
                }
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
        this.router.post('/comments/:collectionId', 
            this.passport.authenticate('jwt', { session: false }), 
            checkSchema(this.validationSchema.comment),
            (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array()
                    });
                }
                Controllers.comment.createOne(req)
                    .then(apiResponse => res.json({ data: apiResponse, err: null }))
                    .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        // Delete
        this.router.delete('/comments/:id', this.passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {
            Controllers.comment.deleteOne(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /**
         * 
         * 
         * Stripe
         * 
         *  */

         this.router.post('/create-checkout-session', 
            this.passport.authenticate('jwt', { session: false }),
            checkSchema(this.validationSchema.stripe),
            async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array()
                    });
                }
                try {
                    const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    mode: "payment",
                    line_items: req.body.items.map( item => {
                        return {
                        price_data: {
                            currency: "eur",
                            product_data: {
                            name: item.address,
                            },
                            unit_amount: 500000,
                        },
                        quantity: item.quantity,
                        }
                    }),
                    success_url: `${process.env.CLIENT_URL}/success`,
                    cancel_url: `${process.env.CLIENT_URL}/cancel`,
                    })
                    res.json({ data: session, err: null })
                } catch (e) {
                    res.status(500).json({ data: null, err: e.message })
                }
            })

    }

    init() {
        this.routes();
        return this.router;
    }
}

module.exports = RouterClass;