module.exports = {
    mongodb: {
      uri: 'mongodb://mongo:27017/tasks'
      // uri: 'mongodb://127.0.0.1:27017/tasks'
    },
    rabbitmq: {
      url: "amqp://rabbitmq:5672"
      // url: "amqp://127.0.0.1:5672"
    },
    server1LogFile: "./logs/server1Log.log",
    server2LogFile: "./logs/server2Log.log"
  };
  