const passport = require('passport');
const LocalStrategy = require('passport-local');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({usernameField : 'email'},
    async function (email, password, done) {
        const User = await userModel.findOne({email : email})

        if(User) {
            bcrypt.compare(password, User.password , async(err, result) => {
                if(err) {
                    done(null, false);
                }
                if(result) {
                    done(null, User);
                }else{
                    done(null, false);
                }
            });
        }else {
            done(null, false);
        }
    }
));

passport.serializeUser(function (user , done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await userModel.findById(id);
        done(null, user)
    }catch (err) {
        done(err);
    }
});

module.exports = passport;