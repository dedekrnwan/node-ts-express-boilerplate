import joi from '@hapi/joi';
import express from 'express';
import response from '../utils/response';

export default {
	body: (schema: joi.ObjectSchema) => async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
		try {
			const result = await schema.validate(req.body);
			if (!result.error) {
				next();
			} else {
				next(response.badRequest({
					flag: 'Error validation',
					message: result.error.message,
					data: {
						error: result.error.details,
					},
				}));
			}
		} catch (error) {
			next(response.badRequest({
				flag: 'Error validation',
				message: error.name,
				data: {
					error: error.details,
				},
			}));
		}
	},
};
