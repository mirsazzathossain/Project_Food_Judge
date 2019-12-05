const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./config/keys');
const User = require('./models/user.model');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },(accessToken, refreshToken, profile, done)=>{
        //cheak if user already exists in our database
        User.findOne({googleId: profile.id}).then((currentUser)=>{
            if(currentUser){
                //already have the user
                console.log('user is:'+currentUser);
                done(null, currentUser);
            }else{
                //create user in our db
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser)=>{
                    console.log('New user created: '+newUser);
                    done(null, newUser);
                });
            }
        }); 
    })
)