const { v4 } = require('uuid');
const { logger1 } = require('../logger');
const Task = require('../models/Task');

module.exports.createTask = async function(req, res, next) {
    try {
        logger1.log('debug', {
            messageFrom: "server1",
            traceId: res.locals.traceId,
            message: `start recieve tasks`
        });

        const taskId = v4();
        const status = "wait";

        const task = new Task({
            taskId,
            status
        });

        await task.save();

        res.locals.task = { taskId, status };

        await next();
    } catch (err) {
        logger1.log('error', {
            messageFrom: "server1",
            traceId: res.locals.traceId,
            message: err
        });

        res.status(500).json({ message: "Не удалось создать задание" })
    }
}