import winston from 'winston';
import expressWinston from 'express-winston';

const transport = {
	console: new winston.transports.Console({
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.timestamp({
				format: 'DD-MM-YYYY HH:mm:ss',
			}),
			winston.format.prettyPrint(),
			winston.format.metadata(),
			winston.format.printf((log) => `[${log.metadata.timestamp}] ${log.level}: ${log.message} \n${JSON.stringify(log.metadata, null, 2)} \n`),
		),
	}),
	file: [
		// new winston.transports.File({
		// 	level: 'info',
		// 	filename: `${__dirname}../../../logs/info.log`,
		// 	format: winston.format.combine(
		// 		// winston.format.colorize(),
		// 		winston.format.timestamp({
		// 			format: 'DD-MM-YYYY HH:mm:ss',
		// 		}),
		// 		winston.format.prettyPrint(),
		// 		winston.format.metadata(),
		// 		winston.format.printf((log) => `[${log.metadata.timestamp}] ${log.level.toUpperCase()}: ${log.message} \n${JSON.stringify(log.metadata, null, 2)} \n`),
		// 	),
		// }),
		new winston.transports.File({
			level: 'warn',
			filename: `${__dirname}/../../logs/warn.log`,
			format: winston.format.combine(
				// winston.format.colorize(),
				winston.format.timestamp({
					format: 'DD-MM-YYYY HH:mm:ss',
				}),
				winston.format.prettyPrint(),
				winston.format.metadata(),
				winston.format.printf((log) => `[${log.metadata.timestamp}] ${log.level.toUpperCase()}: ${log.message} \n${JSON.stringify(log.metadata, null, 2)} \n`),
			),
		}),
		new winston.transports.File({
			level: 'error',
			filename: `${__dirname}/../../logs/error.log`,
			format: winston.format.combine(
				// winston.format.colorize(),
				winston.format.timestamp({
					format: 'DD-MM-YYYY HH:mm:ss',
				}),
				winston.format.prettyPrint(),
				winston.format.metadata(),
				winston.format.printf((log) => `[${log.metadata.timestamp}] ${log.level.toUpperCase()}: ${log.message} \n${JSON.stringify(log.metadata, null, 2)} \n`),
			),
		}),
		// new winston.transports.File({
		// 	level: 'debug',
		// 	filename: `${__dirname}../../../logs/debug.log`,
		// 	format: winston.format.combine(
		// 		// winston.format.colorize(),
		// 		winston.format.timestamp({
		// 			format: 'DD-MM-YYYY HH:mm:ss',
		// 		}),
		// 		winston.format.prettyPrint(),
		// 		winston.format.metadata(),
		// 		winston.format.printf((log) => `[${log.metadata.timestamp}] ${log.level.toUpperCase()}: ${log.message} \n${JSON.stringify(log.metadata, null, 2)} \n`),
		// 	),
		// }),
	],
};

const logger = winston.createLogger({
	// levels: winston.config.syslog.levels,
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 3,
	},
	exitOnError: false,
	transports: [
		transport.console,
		...transport.file,
	],
});
winston.addColors({
	error: 'red',
	warn: 'yellow',
	info: 'cyan',
	debug: 'green',
});
export const expressLogger = expressWinston.logger({
	transports: [
		transport.console,
		...transport.file,
	],
});

export default logger;
