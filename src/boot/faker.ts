import faker from 'faker';
import bcryptjs from 'bcryptjs';
import UserModel from '../modules/user/user.model';

export default (): Promise<any> => new Promise(async (resolve, reject) => {
	try {
		setTimeout(async () => {
			for (let index = 0; index < 5; index++) {
				const card = faker.helpers.userCard();
				const password = bcryptjs.hashSync('secret', bcryptjs.genSaltSync(10));
				UserModel.create({
					name: card.name,
					username: card.username,
					email: card.email,
					password,
					birthdate: faker.date.past(),
					phone: card.phone,
					telephone: card.phone,
					rememberToken: null,
					verificationDate: null,
					createdDate: new Date(),
					createdId: null,
				}).then((result) => {
					global.logger.info({
						message: 'User has been generated',
						result,
					});
				}).catch((err) => {
					global.logger.error(err);
				});
			}
		}, 5000);
		resolve(true);
	} catch (error) {
		reject(error);
	}
});
