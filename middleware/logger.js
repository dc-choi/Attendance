const fs = require('fs');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment');
require('moment-timezone');

const logDir =  './logs';

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

// winston을 콘솔에서도 출력.
logger.add(new transports.Console({ format: format.combine() }));

// winston을 morgan과 함께 사용할때의 객체
const stream = {
    write: message => {
        logger.info(message)
    }
}

module.exports = { logger, stream };