import elasticApmNode from 'elastic-apm-node';

export default (): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const apm = await elasticApmNode.start({
			serviceName: 'Elk Stack',
			serverUrl: `${process.env.APM_SERVER_HOST}`,
			captureBody: 'all',
			usePathAsTransactionName: true,
			// logLevel: 'trace',
		});
		resolve(apm);
	} catch (error) {
		reject(error);
	}
});
