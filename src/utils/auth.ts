import express from 'express';
import jwt from './jwt';
import { IAuthorityCheck } from '../interfaces';
import Module from '../modules/module/module.model';
import Authority from '../modules/authority/authority.model';
import AuthorityAccess from '../modules/authority/authorityAccess/authorityAccess.model';
import UserAuthority from '../modules/user/userAuthority/userAuthority.model';
import User from '../modules/user/user.model';
import Exception from './exception';

export default {
	authenticated: (req: express.Request): Promise<User> => new Promise<User>(async (resolve, reject) => {
		try {
			const token: string = req.headers.authorization ? req.headers.authorization.replace(/Bearer/g, '').replace(/ /g, '') : '';
			if (token) {
				const result = await jwt.verify(token);
				if (result) {
					const jwtDecoded = await jwt.decode(token);
					const user = await User.findOne({
						where: {
							id: jwtDecoded.payload.id,
						},
					});
					if (user) {
						resolve(user);
					} else {
						reject({
							code: 401,
							flag: 'Unauthorized',
							message: 'Access denied, Token is invalid',
						});
					}
				} else {
					reject({
						code: 401,
						flag: 'Unauthorized',
						message: 'Access denied, Token is invalid',
					});
				}
			} else {
				reject({
					code: 401,
					flag: 'Unauthorized',
					message: 'Access denied, Token is invalid',
				});
			}
		} catch (error) {
			// reject(new Exception(error));
			reject({
				code: 401,
				flag: 'Unauthorized',
				message: 'Access denied, Token is invalid',
			});
		}
	}),
	authorized: (object: IAuthorityCheck): Promise<any> => new Promise<any>(async (resolve, reject) => {
		try {
			const auth = await AuthorityAccess.findOne({
				include: [
					{
						model: Authority,
						// as: 'Authority',
						required: false,
						include: [
							{
								model: UserAuthority,
								// as: 'UserAuthority',
								required: false,
								include: [
									{
										model: User,
										// as: 'User',
										required: false,
										where: {
											id: object.user.id,
										},
									},
								],
							},
						],
					},
					{
						model: Module,
						// as: 'Module',
						required: false,
						where: {
							name: object.modules,
						},
					},
				],
			});
			if (auth) {
				if (auth[object.action.toLowerCase()]) {
					resolve(auth[object.action.toLowerCase()]);
				} else {
					reject({
						code: 401,
						flag: 'Unauthorized',
						message: 'You doesn\'t have valid authority',
					});
				}
			} else {
				reject({
					code: 401,
					flag: 'Unauthorized',
					message: 'You doesn\'t have valid authority',
				});
			}
		} catch (error) {
			reject(new Exception(error));
		}
	}),
};
