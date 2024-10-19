const express = require('express');
const { postJob, sendEmails } = require('../controllers/jobController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/post-job', verifyToken, postJob);
router.post('/send-emails', verifyToken, sendEmails);

module.exports = router;
