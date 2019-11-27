import * as express from 'express';
import Exception from '../utils/exception';

export default (): any => ({
	start: async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
		try {
			res.locals.apm = global.apm;
			res.locals.transaction = await res.locals.apm.startTransaction('Testing Transaction');
			next();
		} catch (error) {
			next(new Exception(error));
		}
	},
	end: async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
		try {
			res.locals.apm.transaction.end(200);
			next();
		} catch (error) {
			next(new Exception(error));
		}
	},
});
