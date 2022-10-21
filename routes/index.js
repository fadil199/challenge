const express = require('express');
const router = express.Router();
const user = require('./user');
const histori  = require('./histori');
const biodata = require('./biodata');


router.use('/user', user);
router.use('/histori', histori);
router.use('/biodata', biodata);

module.exports = router;