/* eslint-disable radix */
import express from 'express';
import { HttpException } from '@dedekrnwan/core';

export default {
	pagination: async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
		try {
			const query: any = {};
			if (req.query.paginate) {
				const page = (req.query.page) ? parseInt(req.query.page) - 1 : 0;
				query.limit = (req.query.limit) ? parseInt(req.query.limit) : 10;
				query.offset = page * query.limit;
				query.order = [
					['createdDate', 'DESC'],
				];
				res.locals.query = query;
				next();
			} else {
				next();
			}
		} catch (error) {
			next(new HttpException(error));
		}
	},
};
