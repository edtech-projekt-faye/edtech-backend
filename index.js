const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 3500
const mongoose = require('mongoose')
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/password-google');
const uri = process.env.dbUri
const courseDatabase = require('./models/courseModel')
const User = require('./models/User')
// const { OAuth2Client } = require('google-auth-library')
// const jwt = require('jsonwebtoken')
// const exec = require('exec');
// const client = new OAuth2Client('453961586241-52k5ikmftcd8v9qu4l13hl40or1pfl43.apps.googleusercontent.com')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => {
  console.log("database connected");
  app.listen(port, () => {
    console.log('Example app listening on port', port + '!');
  });
})

// app.use('/auth', authRoutes);
// app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.get('/courses', (req, res) => {
  // const newItem = new courseDatabase({
  //   course_name: 'CSS',
  //   course_category: 'Basics',
  //   course_definition: 'CSS is Hello World',
  //   course_intro: 'CSS courses are basics in Frontend Development',
  //   course_duration: '2 h 30 m',
  //   course_img: 'not findese',
  //   course_lessons: [
  //     {
  //       lesson_number: "1",
  //       lesson_name: 'class',
  //       lesson_video_url: 'http://',
  //       lesson_introduction: "classes have so much properties",
  //       lesson_tests: [
  //         {
  //           test_name: "Class test",
  //           test_number: "1",
  //           test_questions: [
  //             {
  //               question_number: "1",
  //               question: "what is the Class?",
  //               answers: [
  //                 {
  //                   A: "css hyper texts",
  //                   B: "css hyper markup",
  //                   C: "css hyper markup texts",
  //                   D: "css Hyper Text Markup Language"
  //                 }
  //               ],
  //               correct_answer: "D"
  //             },
  //             {
  //               question_number: "2",
  //               question: "what is the Header?",
  //               answers: [
  //                 {
  //                   A: "a proprty from",
  //                   B: "a html bla bal bla",
  //                   C: "a html selector",
  //                   D: "a html property"
  //                 }
  //               ],
  //               correct_answer: "A"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ],
  // }).save()
  courseDatabase.find()
    .then(item => res.json(item))
    .catch(err => console.log(err))
  // res.send('Hello World!');
});


// app.get('/googlelogin', (req, res) => {
//   const { tokenId } = req.body
//   client.verifyIdToken({ idToken: tokenId, audience: '453961586241-52k5ikmftcd8v9qu4l13hl40or1pfl43.apps.googleusercontent.com' })
//     .then(response => {
//       const { email_verified, name, email } = response.payload
//       // console.log(response.payload);
//       if (email_verified) {
//         User.findOne({ email }).then((err, user) => {
//           if (err) {
//             return res.status(400).json({
//               error: 'Something wrong'
//             })
//           } else {
//             if (user) {
//               const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY, { expiresIn: '7d' })
//               const { _id, name, email } = user;
//               res.json({
//                 token,
//                 user: { _id, name, email }
//               })
//             } else {
//               let password = email + process.env.JWT_SIGNIN_KEY
//               let newUser = new User({ name, email, password });
//               newUser.save((err, data) => {
//                 if (err) {
//                   return res.status(400).json({
//                     error: "Somthing falsh"
//                   })
//                 } else {
//                   const token = jwt.sign({ _id: data._id }, process.env.JWT_SIGNIN_KEY, { expiresIn: '7d' })
//                   const { _id, name, email } = newUser;
//                   res.json({
//                     token,
//                     user: { _id, name, email }
//                   })
//                 }

//               })

//             }
//           }
//         })
//       }
//     })
//   console.log();
// })

app.get('/course/:id', (req, res) => {
  // console.log(req.params.id);
  courseDatabase.findById(req.params.id)
    .then(course => res.json(course))
})

// ERROR 404 HANDLER
app.use(function (req, res, next) {
  res.status(404).send('404 - Not Found!');
});
