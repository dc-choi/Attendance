const fs = require('fs');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment');
require('moment-timezone');

const logDir =  __dirname + './logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

moment.tz.setDefault('Asia/Seoul'); // 서버 로그의 기본값을 Asia/Seoul로 설정
const timeStamp = () => moment().format('YYYY-MM-DD HH:mm:ss'); // 시간 출력 포멧 설정

// 무슨 포멧으로 출력할 지 결정
const loggingFormat = format.printf(({ level, message }) => {
    return `${timeStamp()} ${level} : ${message}`;
})

const logger = createLogger({
	level: 'info',
	format: format.combine(
        loggingFormat
    ),
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

// 운영 환경에서는 안씀.
// logger.add(new transports.Console({ format: format.combine() }));

const stream = {
    write: message => {
        logger.info(message)
    }
}

module.exports = { logger, stream };