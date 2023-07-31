const { logger1 } = require('../logger');
const Task = require('../models/Task');

module.exports.getCompletedTask = async function (task) {
    try {
        logger1.log('debug', {
            messageFrom: "server1",
            traceId: task.traceId,
            message: `get completed task Id = ${task.taskId} and update it in db`
        });

        const status = task.status;

        await Task.findOneAndUpdate({ taskId: task.taskId }, { status }, {
            returnOriginal: false
        })
    } catch (err) {
        logger1.log('error', {
            messageFrom: "server1",
            traceId: task.traceId,
            message: err
        });

        throw err;
    }
};