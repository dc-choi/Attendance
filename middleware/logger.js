const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const logDir = './logs';

const logger = createLogger({
	level: 'info',
	format: format.json(),
	transports: [
		new transports.DailyRotateFile({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            zippedArchive: true,	
            handleExceptions: true,
            maxFiles: 30,  
        }),
        new transports.DailyRotateFile({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',  
            filename: `%DATE%.error.log`,
            zippedArchive: true,
            maxFiles: 30,
        }),
	],
});

logger.add(new transports.Console({ format: format.simple() }));

module.exports = logger;