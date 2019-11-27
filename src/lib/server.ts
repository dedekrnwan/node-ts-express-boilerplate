import 'localenv';
import { Logger } from 'winston';
import App from './app';
import listeners from '../listeners';
import logger from '../utils/logger';

declare global {
    namespace NodeJS {
        interface Global {
            logger: Logger;
            connections: any;
        }
    }
}

global.logger = logger;
global.logger.info(`Listening ${process.env.NODE_ENV} config`);

const application = new App();
application.run(3000).then(async () => {
	try {
		const eventEmitter = await listeners();
		setTimeout(() => {
			eventEmitter.emit('testing', {
				tes: 'some',
			});
		}, 5000);
	} catch (error) {
		global.logger.error(error);
	}
}).catch((error) => {
	global.logger.error(error);
});
