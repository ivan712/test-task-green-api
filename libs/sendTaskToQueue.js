const { logger1, logger2 } = require('../logger');
const config = require('../config');
const amqp = require("amqplib");

module.exports.sendTaskToQoueue = async function (task, queue, requestFrom) {
    const logger = requestFrom === 'server1' ? logger1 : logger2;

    let connection;
    try {
        logger.log('info', {
            messageFrom: requestFrom,
            traceId: task.traceId,
            message: `send task Id = ${task.taskId} to queue`
        });

        connection = await amqp.connect(config.rabbitmq.url);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)));
        await channel.close();
    } catch (err) {
        console.log(err);
        logger.log('error', JSON.stringify({
            messageFrom: requestFrom,
            traceId: task.traceId,
            message: err
        }));

        throw err;
    } finally {
        if (connection) await connection.close();
    }
};