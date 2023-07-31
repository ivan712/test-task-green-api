
const { logger1 } = require('../logger');
const { sendTaskToQoueue } = require('../libs/sendTaskToQueue');

module.exports.sendTask = async (req, res, next) => {
  try {
    logger1.log('debug', {
      messageFrom: "server1",
      traceId: res.locals.traceId,
      message: `try send task Id = ${res.locals.task.taskId} to queue from middlware`
    });

    res.locals.task.traceId = res.locals.traceId;

    await sendTaskToQoueue(res.locals.task, 'newTasksQueue', 'server1');

    res.status(200).json({ message: `Создали задание Id = ${res.locals.task.taskId} и отправили его в обработку` });
  } catch (err) {
    logger1.log('error', {
      messageFrom: "server1",
      traceId: res.locals.traceId,
      message: err
    });

    res.status(500).json({ message: "Не удалось добавить задание в очередь" });
  }
};