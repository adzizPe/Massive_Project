const express = require('express');
const router = express.Router();

// PUT /profile
router.put('/', (req, res) => {
  const upload = req.upload;
  const db = req.db;

  upload.single('profilePicture')(req, res, async (err) => {
    // ... your existing profile update logic ...
  });
});

module.exports = router; 