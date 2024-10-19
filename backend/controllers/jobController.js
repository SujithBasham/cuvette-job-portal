const Job = require('../models/Job');
const nodemailer = require('nodemailer');

// Post a job
exports.postJob = async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, endDate } = req.body;
  try {
    const newJob = new Job({
      company: req.user.id, // from JWT payload
      jobTitle,
      jobDescription,
      experienceLevel,
      endDate,
    });
    const savedJob = await newJob.save();
    res.json(savedJob);
  } catch (err) {
    res.status(500).json({ msg: 'Error posting job' });
  }
};

// Send email to candidates
exports.sendEmails = async (req, res) => {
  const { emails, jobDetails } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails.join(','),
    subject: 'Job Alert',
    text: `Job Title: ${jobDetails.title} \\nDescription: ${jobDetails.description}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ msg: 'Emails sent successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error sending emails' });
  }
};
