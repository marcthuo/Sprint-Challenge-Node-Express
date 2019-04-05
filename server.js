const express = require ('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const Router = require('./');

const db = require('./data/dbConfig.js');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('api/post, postRouter')

server.get('/', (req, res) => {
    res.send('You are running your API!');
});

module.exports = server;