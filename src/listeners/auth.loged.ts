import { User } from '../models';

export default ({
	user,
	token,
}): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		resolve(`${user.name} has been loged`);
	} catch (error) {
		reject(error);
	}
});
