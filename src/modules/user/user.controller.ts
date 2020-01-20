import express from 'express';
import joi from '@hapi/joi';
import {
	Controller, Route, RouteMiddleware, OkResponse,
	HttpException,
	BadGatewayException,
} from '@dedekrnwan/core';
import authMiddleware from '../../middlewares/auth.middleware';
import User from './user.model';
import redisMiddleware from '../../middlewares/redis.middleware';
import queryMiddleware from '../../middlewares/query.middleware';
import joiMiddleware from '../../middlewares/joi.middleware';
import { register } from '../auth/auth.service';

@Controller('/user')
export default class UserController {
	public EVENT_USER_CREATED = 'user.created'

    @Route({
    	method: 'get',
    	path: '/',
    })
    @RouteMiddleware.before([
    	queryMiddleware.pagination,
    	redisMiddleware.handler,
    ])
    get = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    	try {
    		const users = await User.findAll({
    			...res.locals.query,
    		});
    		// users = users.map((user) => {
    		// 	const item = {
    		// 		...user,
    		// 	};
    		// 	delete item.password;
    		// 	return item;
    		// });
    		// console.log(users);
    		next(new BadGatewayException({
    			message: 'User has beeen retrivied',
    			data: users,
    		}));
    	} catch (error) {
    		next(new HttpException(error));
    	}
    }

	@Route({
		method: 'post',
		path: '/',
	})
	@RouteMiddleware.before([
		authMiddleware.authenticated,
		// authMiddleware.authorized({
		// 	action: 'AUTHINS',
		// 	modules: 'user',
		// }),
		joiMiddleware.body(joi.object().keys({
			name: joi.string().required().max(255),
			username: joi.string().required().max(255),
			email: joi.string().required().email().max(255),
			password: joi.string().required().min(8).max(20)
				.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/),
			birthdate: joi.date(),
			phone: joi.string().required().min(10).max(20),
			telephone: joi.string().min(10).max(20),
			verificationDate: joi.date(),
			facebookId: joi.number(),
			googleId: joi.number(),
			linkedinId: joi.number(),
			twitterId: joi.number(),
		})),
	])
    store = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    	try {
    		const { token, user } = await register({
    			name: req.body.name,
    			username: req.body.name,
    			email: req.body.name,
    			password: req.body.name,
    			birthdate: req.body.name,
    			phone: req.body.name,
    			telephone: req.body.name,
    			verificationDate: req.body.name,
    			facebookId: req.body.name,
    			googleId: req.body.name,
    			linkedinId: req.body.name,
    			twitterId: req.body.name,
    		});
    		next(new OkResponse({
    			message: 'Register successfully',
    			data: {
    				token,
    			},
    		}));
    	} catch (error) {
    		next(new HttpException(error));
    	}
    }
}
