const winston = require('winston')
const wdrFile = require('winston-daily-rotate-file')
const configuration = require('../config/configuration')

const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const transport = new wdrFile({
    filename: configuration.log_config.folder_path + configuration.log_config.file_path,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '10d',
    prepend: true
})

const logger = winston.createLogger({
    format: logFormat,
    transports: [
        transport
    ]
})

module.exports = logger