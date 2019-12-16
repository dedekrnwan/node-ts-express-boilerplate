import express from 'express';
import { Controller, Route, RouteMiddleware } from '@dedekrnwan/decorators-express';
import { Exception } from '../../utils/exception';
import authMiddleware from '../../middlewares/auth.middleware';
import { response } from '../../utils/response';
import User from './user.model';
import redisMiddleware from '../../middlewares/redis.middleware';
import queryMiddleware from '../../middlewares/query.middleware';

@Controller('/user')
export default class UserController {
    @Route({
    	method: 'get',
    	path: '/',
    })
    @RouteMiddleware.before([
    	authMiddleware.authenticated,
    	queryMiddleware.pagination,
    	redisMiddleware.handler,
    ])
    get = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    	try {
    		let users = await User.findAll({
    			...res.locals.query,
    		});
    		users = users.map((user) => {
    			const item = {
    				...user,
    			};
    			delete item.password;
    			return item;
    		});
    		next(response.ok({
    			message: 'User has been retrieved',
    			data: {
    				users,
    			},
    		}));
    	} catch (error) {
    		next(new Exception(error));
    	}
    }
}
