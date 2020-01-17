import joi from '@hapi/joi';
import express from 'express';
import { BadRequestException } from '@dedekrnwan/core';

export default {
	body: (schema: joi.ObjectSchema) => async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
		try {
			const result = await schema.validate(req.body);
			if (!result.error) {
				next();
			} else {
				next(new BadRequestException({
					message: result.error.message,
					data: {
						error: result.error.details,
					},
				}));
			}
		} catch (error) {
			next(new BadRequestException({
				message: error.name,
				data: {
					error: error.details,
				},
			}));
		}
	},
};
