import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorMiddleware from '../middleware/error.middleware';
import responseMiddleware from '../middleware/response.middleware';
import { expressLogger } from '../utils/logger';
import redisMiddleware from '../middleware/redis.middleware';

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
			redisMiddleware.handler,
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
			redisMiddleware.caching,
			responseMiddleware,
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
			errorMiddleware,
		];
		middlewares.forEach(async (middleware: any) => {
			await app.use(middleware);
		});
		resolve(app);
	} catch (err) {
		reject(err);
	}
});
