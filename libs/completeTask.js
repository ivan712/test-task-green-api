const { logger2 } = require('../logger');
const { sendTaskToQoueue } = require('./sendTaskToQueue');

module.exports.completeTask = async function (task) {
    try {
        logger2.log('debug', {
            messageFrom: "server2",
            traceId: task.traceId,
            message: `complete task Id = ${task.taskId}`
        });

        task.status = "success";
        await sendTaskToQoueue(task, 'completedTaskQueue', "server2");
    } catch (err) {
        logger2.log('err', {
            messageFrom: "server2",
            traceId: task.traceId,
            message: err
        });

        throw err;
    }
}