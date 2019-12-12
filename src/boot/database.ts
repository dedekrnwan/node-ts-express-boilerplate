import {
	connection, initializeTable,
} from '../models';

export default (): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const database = await connection.authenticate();
		global.logger.info('Connection to database successfully connected');
		// const connect = await connection.sync({
		//     force: true
		// })
		await initializeTable();
		global.logger.info('Database has been sync');
		resolve(database);
	} catch (error) {
		reject(error);
	}
});
