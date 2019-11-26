import 'localenv';
import { Logger } from 'pino';
import elasticApmNode from 'elastic-apm-node';
import App from './app';
import listeners from '../listeners';
import logger from '../utils/logger';

const apm = elasticApmNode.start({
	serviceName: 'Elk Stack',
	serverUrl: `${process.env.APM_SERVER_HOST}`,
	captureBody: 'all',
});

declare global {
    namespace NodeJS {
        interface Global {
            logger: Logger;
            apm: any;
        }
    }
}

global.apm = apm;
global.logger = logger;
global.logger.info(`Listening ${process.env.NODE_ENV} config`);

const application = new App();
application.run(3000).then(async () => {
	try {
		// const eventEmitter = await listeners();
		// setTimeout(() => {
		// 	eventEmitter.emit('testing', {
		// 		tes: 'some',
		// 	});
		// }, 5000);
	} catch (error) {
		global.logger.error(error);
	}
}).catch((error) => {
	global.logger.error(error);
});
