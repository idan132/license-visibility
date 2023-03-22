const express = require('express');
const router = express.Router();
const licenseCheck = require('../controllers/license-checker.js')

router.post('/', licenseCheck)

module.exports = router;