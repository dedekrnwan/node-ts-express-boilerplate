import bcryptjs from 'bcryptjs';
import { BadRequestException } from '@dedekrnwan/core';
import User from '../user/user.model';
import jwt from '../../utils/jwt';

export interface AuthLogin {
    email: string;
    password: string;
}

export interface AuthRegister {
    name: string;
    username: string | null;
    email: string;
    password?: string | null;
    birthdate?: Date | null;
    phone?: string | null;
    telephone?: string | null;
    rememberToken?: string | null;
    verificationDate?: Date | null;
    createdDate?: Date | null;
    createdId?: number | null;
    updatedDate?: Date | null;
    updatedId?: number | null;
    facebookId?: bigint | null;
    githubId?: bigint | null;
    googleId?: bigint | null;
    linkedinId?: bigint | null;
    twitterId?: bigint | null;
}

export const login = (credentials: AuthLogin): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const user = await User.findOne({
			where: {
				email: credentials.email,
			},
			raw: true,
		});
		if (user) {
			const comparePassword = await bcryptjs.compare(credentials.password, user.password);
			if (comparePassword) {
				// register jwt
				const token = await jwt.sign({
					id: user.id,
				});
				resolve({
					token,
					user,
				});
			} else {
				reject(new BadRequestException({
					message: 'Email or password is invalid',
				}));
			}
		} else {
			reject(new BadRequestException({
				message: 'Email or password is invalid',
			}));
		}
	} catch (error) {
		reject(error);
	}
});


export const register = (data: AuthRegister): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		if (await User.count({
			where: {
				email: data.email,
			},
		}) <= 0) {
			if (await User.count({
				where: {
					username: data.username,
				},
			}) <= 0) {
				const user = await User.create({
					...data,
					password: await bcryptjs.hashSync(data.password, await bcryptjs.genSaltSync(10)),
					createdDate: new Date(),
					updatedDate: new Date(),
				});
				const token = await jwt.sign({
					id: user.id,
				});
				resolve({
					token,
					user,
				});
			} else {
				reject(new BadRequestException({
					message: 'Username already exists',
				}));
			}
		} else {
			reject(new BadRequestException({
				message: 'Email already exists',
			}));
		}
		// if (user) {
		//     const comparePassword = await bcryptjs.compare(credentials.password, user.password)
		//     if (comparePassword) {
		//         // register jwt
		//         const token = await jwt.sign({
		//             id: user.id
		//         })
		//         resolve(token)
		//     }else {
		//         reject(response.badRequest({
		//             message: 'Email or password is invalid',
		//         }))
		//     }
		// }else {
		//     reject(response.badRequest({
		//         message: 'Email or password is invalid',
		//     }))
		// }
	} catch (error) {
		reject(error);
	}
});
