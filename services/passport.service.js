
    const JwtStrategy = require('passport-jwt').Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    const User = require('../models/user.model')


    // const cookieExtractor = (req, res) => {
    //     let token = null;
    //     if (req && req.cookies) token = req.cookies[process.env.COOKIE_NAME];
    //     return token;
    // };

    const authJwt = (passport) => {
        const opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        };
        
        passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
            User.findOne({ email: jwtPayload.email }, (err, user) => {
                if (err) { return done(err, false)}

                if (user) { 
                    return done(null, user) 
                }
                else { 
                    return done(null, false) 
                }

            });
        }));
    };


    module.exports = {
        setAuthentication: (passport) => {
            authJwt(passport);
        },
    };
