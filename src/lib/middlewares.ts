import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import expressPinoLogger from 'express-pino-logger';
import ErrorMiddleware from '../middleware/error.middleware';
import ResponseMiddleware from '../middleware/response.middleware';
import logger, { stream } from '../utils/logger';
import apmMiddleware from '../middleware/apm.middleware';

export const before = (app: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
	try {
		const middlewares: Function[] = [
			// await apmMiddleware().start,
			helmet(),
			cors(),
			express.json(),
			express.urlencoded({
				extended: true,
			}),
			expressPinoLogger({ logger }, stream),
		];
		middlewares.forEach(async (middleware: any) => {
			await app.use(middleware);
		});
		resolve(app);
	} catch (error) {
		reject(error);
	}
});

export const after = (app: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
	try {
		const middlewares: Function[] = [
			// global.apm.middleware.connect(),
			// await apmMiddleware().end,
			ResponseMiddleware,
		];
		middlewares.forEach(async (middleware: any) => {
			await app.use(middleware);
		});
		resolve(app);
	} catch (error) {
		reject(error);
	}
});

export const error = (app: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
	try {
		const middlewares: Function[] = [
			ErrorMiddleware,
		];
		middlewares.forEach(async (middleware: any) => {
			await app.use(middleware);
		});
		resolve(app);
	} catch (err) {
		reject(err);
	}
});
