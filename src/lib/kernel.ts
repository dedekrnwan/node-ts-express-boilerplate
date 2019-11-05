import express from 'express';
import {
	Attach,
} from '@dedekrnwan/decorators-express';
import * as Middlewares from './middlewares';
import AuthController from '../modules/auth/auth.controller';

const controllers = [
	AuthController,
];

const middlewares = (apps: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
	try {
		apps = await Middlewares.before(apps);
		apps = await Attach.Controller(apps, controllers);
		apps = await Middlewares.error(apps);
		apps = await Middlewares.after(apps);
		resolve(apps);
	} catch (error) {
		reject(error);
	}
});

export default async (app: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
	try {
		app = await middlewares(app);
		resolve(app);
	} catch (error) {
		reject(error);
		process.exit(1);
	}
});
