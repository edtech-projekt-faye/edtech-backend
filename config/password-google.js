// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config()
// const User = require('../models/User');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

// passport.use(
//   new GoogleStrategy({
//     // options for google strategy
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: 'http://localhost:3500/auth/google/redirect'
//   }, (accessToken, refreshToken, profile, done) => {
//     // check if user already exists in our own db
//     User.findOne({ googleId: profile.id }).then((currentUser) => {
//       // console.log('it is profile' + profile.email);
//       if (currentUser) {
//         // already have this user
//         console.log('user is: ', currentUser);
//         done(null, currentUser);
//       } else {
//         // if not, create user in our db

//         new User({
//           googleId: profile.id,
//           name: profile.displayName,
//           photo: profile._json.picture,
//           // password: 'dadad',
//           email: "asdas"
//         }).save().then((newUser) => {
//           console.log('created new user: ', newUser);
//           done(null, newUser);
//         });
//       }
//     });
//   })
// );
