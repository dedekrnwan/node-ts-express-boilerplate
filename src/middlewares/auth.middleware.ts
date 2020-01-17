import express from 'express';
import auth from '../utils/auth';
import { IAuthorityCheck } from '../interfaces';

export default {
	authenticated: async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
		try {
			const result = await auth.authenticated(req);
			if (result) {
				next();
			}
		} catch (error) {
			next(error);
		}
	},
	authorized: (object: IAuthorityCheck) => async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
		try {
			const user = await auth.authenticated(req);
			if (user) {
				object.user = user;
				const result = await auth.authorized(object);
				if (result) { next(); }
			}
		} catch (error) {
			next(error);
		}
	},
};
