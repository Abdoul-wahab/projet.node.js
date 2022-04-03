
    const express = require('express');
    const {body, checkSchema, validationResult} = require('express-validator');
    const Controllers = require('../controller/index');
    const User = require('../models/user.model')

    class RouterClass{
        constructor( { passport } ){
            this.router = express.Router();
            this.passport = passport

            this.registrationSchema = {
                firstname: {
                    notEmpty: true,
                    errorMessage: "firstname field cannot be empty"
                },
                lastname: {
                    notEmpty: true,
                    errorMessage: "lastname field cannot be empty"
                },
                email: {
                    normalizeEmail: true,
                    custom: {
                        options: value => {
                            return User.find({
                                email: value
                            }).then(user => {
                                if (user.length > 0) {
                                    return Promise.reject('Email address already taken')
                                }
                            })
                        }
                    }
                },
                password: {
                    notEmpty: true,
                    isLength: {
                        min: 8,
                    },
                    errorMessage: "Password must be greater than 8 and contain",
                }
            }

            this.loginSchema = {
                email: {
                    isEmail: true,
                    normalizeEmail: true,
                }
            }


        }

        routes(){

            this.router.post('/register', 
            checkSchema(this.registrationSchema),
            (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array()
                    });
                }
                Controllers.auth.register(req)
                .then( apiResponse => res.json( { data: apiResponse, err: null } ))
                .catch( apiError => res.status(401).json( { data: null, err: apiError } ))
            })

            this.router.post('/login', (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array()
                    });
                }
                Controllers.auth.login(req, res)
                .then( apiResponse => res.json( { data: apiResponse, err: null } ))
                .catch( apiError => res.status(401).json( { data: null, err: apiError } ))
            })

            this.router.get('/user', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                
            })
        }

        init(){
            this.routes();
            return this.router;
        }
    }


    module.exports = RouterClass;