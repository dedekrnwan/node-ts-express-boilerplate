import { UserVerification, User } from '../../../models';

const makeCode = (length: number): Promise<string> => new Promise<string>(async (resolve, reject) => {
	try {
		let result: string;
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		resolve(result);
	} catch (error) {
		reject(error);
	}
});

export const email = {
	request: (user: User): Promise<any> => new Promise<any>(async (resolve, reject) => {
		try {
			const verification = await UserVerification.create({
				email: user.email,
				code: await makeCode(12),
				expiredDate: new Date().setDate((new Date()).getDate() + 1),
			});
		} catch (error) {
			reject(error);
		}
	}),
};
