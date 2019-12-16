import * as express from 'express';
import Exception from '../utils/exception';

export default (): any => ({
	start: async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
		try {
			// res.locals.apm = global.apm;
			// res.locals.apm.startTransaction(`${req.method.toUpperCase()} ${req.originalUrl}`, 'HTTP Request');
			// res.locals.apm.setTransactionName(`${req.method.toUpperCase()} ${req.originalUrl}`, 'HTTP Request');
			next();
		} catch (error) {
			next(new Exception(error));
		}
	},
	end: async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
		try {
			// res.locals.apm.endTransaction();
			next();
		} catch (error) {
			next(new Exception(error));
		}
	},
});
