const express = require('express');
const router = express.Router();
const cont = require('../controllers');

router.get('/index', cont.index2.index);

module.exports = router;