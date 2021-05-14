const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 3500
const mongoose = require('mongoose')
const uri = process.env.dbUri
const courseDatabase = require('./models/courseModel')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
  console.log("database connected");
  app.listen(port, () => {
    console.log('Example app listening on port', port + '!');
  });
})

app.get('/', (req, res) => {
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




// ERROR 404 HANDLER
app.use(function (req, res, next) {
  res.status(404).send('404 - Not Found!');
});
