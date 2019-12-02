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

const server = (): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const application = new App();
		const app = await application.run(3000);
		resolve({
			app,
		});
	} catch (error) {
		reject(error);
	}
});

server().then((result) => {
	//
}).catch((error) => {
	throw error;
});
