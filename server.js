const express = require ('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const projectRouter = require('./data/helpers/projectRouter.js');
const actionRouter = require('./data/helpers/actionRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use('api/projects', projectRouter);
server.use('api/actions', actionRouter);
server.use(updater);

server.get('/', (req, res) => {
    res.send('You are running your API!');
});

function updater (req, res, next) {
    console.log('UPDATED')
    next()
};

module.exports = server;