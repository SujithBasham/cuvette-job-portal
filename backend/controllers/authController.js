const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

// Register a new company
exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ msg: 'Company already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCompany = new Company({ name, email, password: hashedPassword, phone });
    await newCompany.save();
    res.json({ msg: 'Company registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login company
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(400).json({ msg: 'Company not found' });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
