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
import App, { IApplicationStaticProperties } from '@dedekrnwan/core';
import logger, { expressLogger } from '../utils/logger';
import config from 'config';
import { IServerOptions } from '../interfaces';
import * as packageJson from '../../package.json';
// import listeners from '../listeners';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import redisMiddleware from '../middlewares/redis.middleware';
import path from 'path';

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
		const application: App = new App();
		application.addModules(path.join(__dirname, './../modules'));
		application.addStatic({
			path: path.join(__dirname, './../../public'),
			prefix: '/public',
		});
		application.addBootable(path.join(__dirname, './../boot'));
		application.setMiddlewares({
			before: [
				helmet(),
				cors(),
				express.json(),
				express.urlencoded({
					extended: true,
				}),
				expressLogger,
			],
			after: [
				redisMiddleware.caching,
			],
		});
		application.setListener(path.join(__dirname, './../listeners'));

		const { core, app } = await application.run(options.port);
		global.logger.info(`${packageJson.name} listening on the port ${options.port}`);

		resolve({
			app: core,
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
