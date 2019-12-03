import elasticApmNode from 'elastic-apm-node';
import config from 'config';

export default (): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const apm = await elasticApmNode.start({
			serviceName: 'Elk Stack',
			serverUrl: `${config.get('services.apm-server.host')}`,
			captureBody: 'all',
			usePathAsTransactionName: true,
			// logLevel: 'trace',
		});
		global.apm = apm;
		resolve(apm);
	} catch (error) {
		reject(error);
	}
});
