import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import expressPinoLogger from 'express-pino-logger';
import ErrorMiddleware from '../middleware/error.middleware';
import ResponseMiddleware from '../middleware/response.middleware';
import { expressLogger } from '../utils/logger';

export const before = (app: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
	try {
		const middlewares: Function[] = [
			helmet(),
			cors(),
			express.json(),
			express.urlencoded({
				extended: true,
			}),
			expressLogger,
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
