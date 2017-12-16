// Import dependencies
//--------------------------------------------------------
const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

module.exports = {
    useLocal: () => {
        passport.use(new LocalStrategy(
            (email, password, done) => {
                db.User.findOne({email: email})
                .then(user => {
                    if(!user){
                        // if no user found
                        return done(null, false, { message: "Incorrect Username" })
                    }else if(password !== user.password){
                        // if password is incorrect
                        return done(null, false, { message: "Incorrect password" })
                    }else{
                        // able to login
                        done(null, user, null)
                    }
                })
                .catch(err => console.log(err));
            }
        ))
    },

    authenticate: (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if(err){ return res.send(err) };
            if(!user){ return res.status(401).send(info) };
            // pass logging in
            req.logIn(user, err => {
                if(err){ 
                    return res.status(401).send(info) 
                }
                else{
                    // run callback if successfully login
                    next(user)
                }
            })
        })(req, res, next);
    },

    serialize: () => {
        passport.serializeUser( (user, done) => {
            return done(null, user._id);
        });
    },

    deserialize: () => {
        passport.deserializeUser( (id, done) => {
            db.User.findById(id)
                .then( user => {
                    if(!user){ done(null)}
                    else{ done(null, user)}
                })
                .catch(err => console.log(err));
        });
    }

}