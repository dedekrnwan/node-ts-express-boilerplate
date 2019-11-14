import pino from 'pino';
import childProcess from 'child_process';
import pinoMultiStream, { multistream } from 'pino-multi-stream';

const cwd = process.cwd();
const logPath = `${cwd}/logs`;

const teeStream = childProcess.spawn(
	process.execPath,
	[
		require.resolve('pino-tee'),
		'warn', `${logPath}/warn.log`,
		'error', `${logPath}/error.log`,
		'fatal', `${logPath}/fatal.log`,
		'debug', `${logPath}/debug.log`,
	],
	{
		cwd,
		env: process.env,
	},
);

export const stream = multistream([
	{ stream: pinoMultiStream.multistream() },
	{ stream: process.stdout },
	{ stream: teeStream.stdin },
]);

const log = pino({}, stream);
export default log;
