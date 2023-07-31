const { logger1 } = require('../logger');
const Task = require('../models/Task');

module.exports.getTaskById = async function (req, res) {
    try {
        logger1.log('debug', {
            messageFrom: "server1",
            traceId: res.locals.traceId,
            message: `get task by id`
        });

        const task = await Task.findOne({ taskId: req.query.taskid }, 'taskId status');

        if (!task) {
            res.status(404).json({ message: `Задание с идентификатором Id = ${req.query.taskid} не найдено` });
        } else {
            res.status(200).json(task);
        }
    } catch (err) {
        logger1.log('error', {
            messageFrom: "server1",
            traceId: res.locals.traceId,
            message: err
        });

        res.status(500).json({ message: "Не удалось получить задание" });
    }
}