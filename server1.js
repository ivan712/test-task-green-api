const express = require('express');
const { v4 } = require('uuid');
const { logger1 } = require('./logger');
const { createTask } = require('./middlwares/createTask');
const { sendTask } = require('./middlwares/sendTask');
const { getAllTasks } = require('./middlwares/getAllTasks');
const { getTaskById } = require('./middlwares/getTaskById');
const { recieveTasks } = require('./libs/recieveTasks');
const { getCompletedTask } = require('./libs/getCompletedTask');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger/openapi.json');

const server1 = express();

recieveTasks(getCompletedTask, 'completedTaskQueue', 'server1');

server1.use((req, res, next) => {
    const traceid = v4();
    res.locals.traceId = traceid;

    logger1.log('info', {
        messageFrom: "server1",
        traceId: traceid,
        message: `${req.originalUrl} ${req.method}`
    });

    next();
});

server1.get('/createtask', createTask, sendTask);
server1.get('/getalltasks', getAllTasks);
server1.get('/gettaskbyid', getTaskById);

server1.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

server1.use((req, res, next) => {
    logger1.log('info', {
        messageFrom: "server1",
        traceId: res.locals.traceid,
        message: `${req.method} ${req.originalUrl} not found`
    });

    res.status(404).json({ message: `${req.method} ${req.originalUrl} not found` })
});

server1.use((error, req, res, next) => {
    logger1.log('error', {
        messageFrom: "server1",
        traceId: res.locals.traceid,
        message: error
    });

    res.status(500).json({ message: "Internal Server Error" })
});

module.exports = server1;