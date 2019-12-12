import express from 'express';
import { Controller, Route, RouteMiddleware } from '@dedekrnwan/decorators-express';
import { Exception } from '../../utils/exception';
import authMiddleware from '../../middleware/auth.middleware';
import { response } from '../../utils/response';
import User from './user.model';
import redisMiddleware from '../../middleware/redis.middleware';
import queryMiddleware from '../../middleware/query.middleware';

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
    		const users = await User.findAll({
    			...res.locals.query,
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
