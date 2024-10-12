const express = require('express');
const { uploadScorm } = require('../controllers/scormController');
const router = express.Router();

// POST route to upload a SCORM zip file
router.post('/upload', uploadScorm);

module.exports = router;
