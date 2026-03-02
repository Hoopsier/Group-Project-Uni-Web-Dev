const express = require('express');
const router = express.Router();
const aiRequest = require('../controllers/aiController.js');

router.post('/', aiRequest);

module.exports = router;
