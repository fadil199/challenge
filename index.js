const express = require('express');
const morgan = require('morgan');
const router = require('./routes/index');
require('dotenv').config();
const index = express();
const path = require('path');
const cookieParser = require('cookie-parser');

index.use(express.json());
index.use(morgan('dev'));
index.use(router);
index.use(express.urlencoded({ extended: false }));
index.use(express.static(path.join(__dirname, 'public')));
index.use(cookieParser());

index.use('/', router);

index.use((req, res, next) => {
    return res.status(404).json({
        status: false,
        message: 'hayo tersesat ya?'
    })
})

index.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        status: false,
        message: err.message
    })
})

module.exports = index;