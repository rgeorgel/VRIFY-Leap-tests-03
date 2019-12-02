const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const allowCors = require('./cors');
const logger = require('morgan');

const db = require('../models');
const apiCustomer = require('../api/customer/customer');
const apiAddress = require('../api/customer/address');

server.use(logger('dev'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);

apiCustomer(server, db);
apiAddress(server, db);

module.exports = server;