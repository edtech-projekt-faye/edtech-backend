const mongoose = require('mongoose')
const { Schema } = mongoose


const courseSchema = new Schema({
  course_name: String,
  course_category: String,
  course_definition: String,
  course_intro: String,
  course_duration: String,
  course_img: String,
  course_lessons: Array,
})

const courseDatabase = mongoose.model('course', courseSchema)
module.exports = courseDatabase
