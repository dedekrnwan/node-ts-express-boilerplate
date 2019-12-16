import express from 'express';
import response from '../utils/response';

export default (req: express.Request, res: express.Response, next: express.NextFunction): void => {
	next(response.notFound({
		message: 'Not found',
		data: {},
	}));
};
