import express from 'express';
import { Controller, Route, RouteMiddleware } from '@dedekrnwan/decorators-express';
import joi from '@hapi/joi';
import { Exception } from '../../utils/exception';
import joiMiddleware from '../../middleware/joi.middleware';
import { login, register } from './auth.service';
import { response } from '../../utils/response';
import authMiddleware from '../../middleware/auth.middleware';
import eventEmitter from '../../listeners';

@Controller('/auth')
export default class AuthController {
	private EventEmitter

	public EVENT_USER_REGISTER = 'auth.register'

	constructor() {
		eventEmitter().then((eem) => {
			this.EventEmitter = eem;
		}).catch(global.logger.error);
	}

    @Route({
    	method: 'post',
    	path: '/login',
    })
    @RouteMiddleware.before([
    	joiMiddleware.body(joi.object().keys({
    		email: joi.string().email().required(),
    		password: joi.string().required(),
    	})),
    ])
    login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    	try {
    		const token = await login({
    			email: req.body.email,
    			password: req.body.password,
    		});
    		next(response.ok({
    			message: 'Login successfully',
    			data: {
    				token,
    			},
    		}));
    	} catch (error) {
    		next(new Exception(error));
    	}
    }

    @Route({
    	method: 'post',
    	path: '/register',
    })
    @RouteMiddleware.before([
    	joiMiddleware.body(joi.object().keys({
    		name: joi.string().required(),
    		username: joi.string().required(),
    		email: joi.string().email().required(),
    		password: joi.string().required(),
    		birthdate: joi.date().required(),
    		phone: joi.string().required(),
    		telephone: joi.string(),
    	})),
    ])
    register = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    	try {
    		const { token, user } = await register({
    			email: req.body.email,
    			name: req.body.name,
    			username: req.body.username,
    			password: req.body.password,
    			birthdate: req.body.birthdate,
    			phone: req.body.phone,
    			telephone: req.body.telephone,
    		});
    		this.EventEmitter.emit(this.EVENT_USER_REGISTER, {
    			user,
    			token,
    		});
    		next(response.ok({
    			message: 'Register successfully',
    			data: {
    				token,
    			},
    		}));
    	} catch (error) {
    		next(error);
    	}
    }

    @Route({
    	method: 'get',
    	path: '/testing',
    })
    @RouteMiddleware.before([
    	authMiddleware.authorized({
    		action: 'AUTHOPE',
    		modules: 'SOME',
    	}),
    ])
    testing = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    	try {
    		next(response.ok({}));
    	} catch (error) {
    		next(error);
    	}
    }
}
