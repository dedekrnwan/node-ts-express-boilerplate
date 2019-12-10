import { Logger } from 'winston';
import App from './app';
import listeners from '../listeners';
import logger from '../utils/logger';
import packageJson from '../../package.json';
import { IServerOptions } from '../interfaces';

declare global {
    namespace NodeJS {
        interface Global {
            logger: Logger;
            apm: any;
        }
    }
}

global.logger = logger;
global.logger.info(`Listening ${process.env.NODE_ENV} config`);

const server = (options: IServerOptions): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const application = new App();
		const app = await application.run(options.port);
		global.logger.info(`${packageJson.name} listening on the port ${options.port}`);

		const eventEmitter = await listeners();
		resolve({
			app,
			eventEmitter,
		});
	} catch (error) {
		process.exit(1);
		reject(error);
	}
});

server({
	port: 3000,
}).then((serverObject) => {

}).catch((error) => {
	throw error;
});
