const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false, // Email or phone verification status
  },
});

module.exports = mongoose.model('Company', CompanySchema);
