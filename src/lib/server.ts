/* eslint-disable no-console */
/* eslint-disable import/first */
/* eslint-disable import/order */
import apmServerService from '../services/apm-server.service';

apmServerService().then(() => {
	console.log('Apm has been run');
}).catch((error) => {
	console.error(error);
});

import { Logger } from 'winston';
import App from './app';
import logger from '../utils/logger';
import config from 'config';
import { IServerOptions } from '../interfaces';
import * as packageJson from '../../package.json';
import listeners from '../listeners';

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
		reject(error);
	}
});

server({
	port: config.get('server.port'),
}).then((result) => {
	//
}).catch((error) => {
	global.logger.error(error);
	process.exit(1);
});
