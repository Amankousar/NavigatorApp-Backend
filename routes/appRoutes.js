const express = require('express');
const router = express.Router();
const { getAllApps } = require('../controllers/appController');

router.get('/', getAllApps);

module.exports = router;
