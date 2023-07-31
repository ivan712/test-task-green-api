const { logger1 } = require('../logger');
const Task = require('../models/Task');

module.exports.getAllTasks = async function (req, res) {
    try {
        logger1.log('debug', {
            messageFrom: "server1",
            traceId: res.locals.traceId,
            message: `get all tasks`
        });

        const tasks = await Task.find({}, 'taskId status');

        res.status(200).json(tasks);
    } catch (err) {
        logger1.log('error', {
            messageFrom: "server1",
            traceId: res.locals.traceId,
            message: err
        });

        res.status(500).json({ message: "Не удалось получить списко заданий" });
    }
}