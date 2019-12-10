import { Client } from '@elastic/elasticsearch';
import config from 'config';

export default (): Promise<Client> => new Promise<Client>(async (resolve, reject) => {
	try {
		const client: Client = await new Client({
			node: config.get('elasticsearch.host'),
		});
		global.logger.info(`Elasticsearch connect on : ${config.get('elasticsearch.host')}`);
		resolve(client);
	} catch (error) {
		global.logger.error(`Elasticsearch unable to connect on : ${config.get('elasticsearch.host')}`);
		reject(error);
	}
});
