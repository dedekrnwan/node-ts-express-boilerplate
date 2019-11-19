import express from 'express';
import { Controller, Route, RouteMiddleware } from '@dedekrnwan/decorators-express';
import Exception from '../../../utils/exception';
import Mailer from '../../../services/mailer.service';
import response from '../../../utils/response';

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
    		next(response.ok({
    			message: 'Email has been send',
    			data: {},
    		}));
    	} catch (error) {
    		next(new Exception(error));
    	}
    }
}
