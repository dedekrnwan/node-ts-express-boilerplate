export default (): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		global.logger.info('User has been created');
	} catch (error) {
		reject(error);
	}
});
