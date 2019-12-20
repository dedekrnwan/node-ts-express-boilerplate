import express from 'express';
import { Controller, Route, RouteMiddleware } from '@dedekrnwan/decorators-express';
import joi from '@hapi/joi';
import Events from 'events';
import { Exception } from '../../utils/exception';
import joiMiddleware from '../../middlewares/joi.middleware';
import { login, register } from './auth.service';
import { response } from '../../utils/response';
import authMiddleware from '../../middlewares/auth.middleware';

@Controller('/auth')
export default class AuthController {
	public EVENT_USER_REGISTERED = 'auth.registered'

	public EVENT_USER_LOGED = 'auth.loged'

	private EventEmitter: Events.EventEmitter

	constructor() {
		this.EventEmitter = new Events.EventEmitter();
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
    		const {
    			token,
    			user,
    		} = await login({
    			email: req.body.email,
    			password: req.body.password,
    		});

    		req.app.locals.eem.emit(this.EVENT_USER_LOGED, {
    			user,
    			token,
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
    register = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    	try {
    		const { token, user } = await register({
    			name: req.body.name,
    			username: req.body.username,
    			email: req.body.email,
    			password: req.body.password,
    			birthdate: req.body.birthdate,
    			phone: req.body.phone,
    			telephone: req.body.telephone,
    			// verificationDate: req.body.verificationDate,
    			facebookId: req.body.facebookId,
    			googleId: req.body.googleId,
    			linkedinId: req.body.linkedinId,
    			twitterId: req.body.twitterId,
    		});
    		req.app.locals.eem.emit(this.EVENT_USER_REGISTERED, {
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
