import User from '../modules/user/user.model';
import UserAuthority from '../modules/user/userAuthority/userAuthority.model';
import Authority from '../modules/authority/authority.model';
import AuthorityAccess from '../modules/authority/authorityAccess/authorityAccess.model';
import Module from '../modules/module/module.model';
import connections from '../utils/connections';

const connection = connections('boilerplate');

User.hasMany(UserAuthority, {
	foreignKey: 'userId',
	sourceKey: 'id',
	// as: 'UserAuthority'
});

Module.hasMany(AuthorityAccess, {
	foreignKey: 'moduleId',
	sourceKey: 'id',
	// as: 'AuthorityAccess'
});

Authority.hasMany(UserAuthority, {
	foreignKey: 'authorityId',
	sourceKey: 'id',
	// as: ' Authority'
});


UserAuthority.belongsTo(User, {
	// as: "User",
	foreignKey: 'userId',
});
UserAuthority.belongsTo(Authority, {
	// as: "Authority",
	foreignKey: 'authorityId',
});


AuthorityAccess.belongsTo(Module, {
	// as: 'Module',
	foreignKey: 'moduleId',
});

AuthorityAccess.belongsTo(Authority, {
	// as: 'Authority',
	foreignKey: 'authorityId',
});


const initializeTable = (): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		await Module.sync({
			force: true,
		});
		global.logger.info('Table module has been synced');

		await User.sync({
			force: true,
		});
		global.logger.info('Table user has been synced');

		await Authority.sync({
			force: true,
		});
		global.logger.info('Table authority has been synced');

		await UserAuthority.sync({
			force: true,
		});
		global.logger.info('Table user authority has been synced');


		await AuthorityAccess.sync({
			force: true,
		});
		global.logger.info('Table authority access has been synced');

		resolve(true);
	} catch (error) {
		reject(error);
	}
});


export {
	initializeTable,
	connection,
	User,
	Authority,
	Module,
	UserAuthority,
	AuthorityAccess,
};
