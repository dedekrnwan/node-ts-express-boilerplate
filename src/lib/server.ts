import 'localenv';
import { Logger } from 'pino';
import { rejects } from 'assert';
import App from './app';
import listeners from '../listeners';
import logger from '../utils/logger';
import apmServerService from '../services/apm-server.service';

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
		const apm = await apmServerService();
		const application = new App();
		const app = await application.run(3000);
		resolve({
			apm, app,
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
