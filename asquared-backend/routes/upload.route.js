// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/uploadConfig');

// POST route for uploading images
router.post('/upload/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file
    });
  });
});

module.exports = router;
