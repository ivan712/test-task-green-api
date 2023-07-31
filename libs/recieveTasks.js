const { logger1, logger2 } = require('../logger');
const config = require('../config');
const amqp = require("amqplib");

module.exports.recieveTasks = async function (handlerTask, queue, requestedFrom) {
  const logger = requestedFrom === 'server1' ? logger1 : logger2;

  try {
    logger.log('info', {
      from: requestedFrom,
      message: `start recieve tasks`
    });

    const connection = await amqp.connect(config.rabbitmq.url);
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      async (message) => {
        if (message) {
          let task = JSON.parse(message.content.toString());

          logger.log('info', {
            messageFrom: requestedFrom,
            traceId: task.traceId,
            message: `recieve tasks Id = ${task.taskId}`
          });

          await handlerTask(task);
        }
      },
      { noAck: true }
    );
  } catch (err) {
    logger.log('error', {
      messageFrom: "server2",
      message: err
    });
  }
}