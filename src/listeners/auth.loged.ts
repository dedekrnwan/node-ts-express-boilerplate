import { User } from '../models';

export default (user: User): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		global.logger.info(`${user.name} has been loged`);
		resolve(user);
	} catch (error) {
		reject(error);
	}
});
