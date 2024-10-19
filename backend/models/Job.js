const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
  },
  endDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Job', JobSchema);
