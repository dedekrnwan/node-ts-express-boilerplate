import express from 'express';
import {
	Controller, Route, RouteMiddleware, OkResponse, HttpException,
} from '@dedekrnwan/core';
import Mailer from '../../../services/mailer.service';

@Controller('/user/verification')
export default class UserVerificationController {
	private mailer: Mailer

	constructor() {
		this.mailer = new Mailer();
	}

    @Route({
    	method: 'post',
    	path: '/email',
    })
    email_request = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    	try {
    		const sendMail = await this.mailer.verify({
    			email: req.body.user.email,
    			name: req.body.user.name,
    			link: 'somthing',
    		});
    		next(new OkResponse({
    			message: 'Email has been send',
    		}));
    	} catch (error) {
    		next(new HttpException(error));
    	}
    }
}
