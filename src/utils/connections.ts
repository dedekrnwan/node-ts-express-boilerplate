import { Sequelize } from 'sequelize';
import config from 'config';

export default (db: string): Sequelize => {
	const databases: any = config.get('database');
	const database = databases.reduce((item) => item.db === db);
	const connection = new Sequelize(
		database.db,
		database.username,
		database.password,
		{
			host: database.host,
			port: database.port,
			dialect: database.dialect,
			logging: false,
		},
	);
	return connection;
};
