
    const bcrypt = require('bcryptjs');
    const Models = require('../models/index');

    const register = req => {
        return new Promise( (resolve, reject) => {

            bcrypt.hash( req.body.password, 10 )
            .then( hashedPassword => {
                req.body.password = hashedPassword;
                req.body.role = 'regular'
                Models.user.create(req.body)
                .then( data => {
                    const userToken = data.generateJwt(data)
                    data.token = userToken
                    resolve({'user': data, 'access_token': userToken }) 
                })
                .catch( err => reject(err) )
            })
            .catch( bcryptError => reject(bcryptError))
        })
    }

    const login = (req, res) => {
        return new Promise( (resolve, reject) => {
            Models.user.findOne( { email: req.body.email } )
            .then( data => {
                const passwordValisation = bcrypt.compareSync( req.body.password, data.password );
                if( passwordValisation) {
                    
                    const userToken = data.generateJwt(data);

                    return resolve({
                        'access_token': userToken,
                        'user': data,
                    })
                    
                }
                else{ return reject('Password not valide') }
            })
            .catch( err => reject(err) )
        })
    }


    module.exports = {
        register,
        login
    }