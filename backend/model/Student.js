const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({
  studentName: {
    type: String
  },
  studentEmail: {
    type: String
  },
  section: {
    type: String
  },
  subjects: {
    type: Array
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  }
}, {
  collection: 'students'
})

module.exports = mongoose.model('Student', Student)
