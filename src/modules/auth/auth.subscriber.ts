const authLogin = (message): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		global.logger.info('Something subscriber handler for rabbitmq');
		resolve(true);
	} catch (error) {
		reject(error);
	}
});

export default {
	'auth:login': authLogin,
};
