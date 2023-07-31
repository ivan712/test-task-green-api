const config = require('./config');

const {
    createLogger,
    transports,
    format
} = require('winston');

const logFormatter = format((info) => {
    if (info.level === 'error')
        info.message = JSON.stringify(
            info.message,
            Object.getOwnPropertyNames(info.message)
        );
        
    return info;
})();

const loggerConfig = (file) => {
    return {
        transports: [new transports.File({
            filename: file,
            level: 'debug',
            format: format.combine(
                format.timestamp(),
                logFormatter,
                format.json()
            )
        })]
    }
}

const logger1 = createLogger(loggerConfig(config.server1LogFile))
const logger2 = createLogger(loggerConfig(config.server2LogFile))

module.exports = { logger1, logger2 };