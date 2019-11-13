import express from 'express';
import { Controller, Route, RouteMiddleware } from '@dedekrnwan/decorators-express';
import { RedisClient } from 'redis';
import { Exception } from '../../utils/exception';
import authMiddleware from '../../middleware/auth.middleware';
import { response } from '../../utils/response';
import User from './user.model';
import redisService from '../../services/redis.service';

@Controller('/user')
export default class UserController {
	private redisClient: RedisClient

	constructor() {
		redisService().then((client) => {
			this.redisClient = client;
		}).catch((error) => global.logger.error(error));
	}

    @Route({
    	method: 'get',
    	path: '/',
    })
    @RouteMiddleware.before([
    	authMiddleware.authenticated,
    ])
    get = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    	try {
    		const cacheKey = 'user:get';
    		this.redisClient.hgetall(cacheKey, async (err, result) => {
    			if (err) {
    				next(new Exception(err));
    			}
    			if (result) {
    				next(response.ok({
    					message: 'User has been retrieved',
    					data: {
    						users: result,
    					},
    				}));
    			}
    			const users = await User.findAll();
    			this.redisClient.hmset(cacheKey, users, (error, rtr) => {
    				if (err) {
    					global.logger.error(err);
    				}
    			});
    			next(response.ok({
    				message: 'User has been retrieved',
    				data: {
    					users,
    				},
    			}));
    		});
    	} catch (error) {
    		next(new Exception(error));
    	}
    }
}
