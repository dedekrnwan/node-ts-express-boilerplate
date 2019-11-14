import redis from 'redis';
import config from 'config';

export default (): Promise<redis.RedisClient> => new Promise<redis.RedisClient>(async (resolve, reject) => {
	try {
		const configRedis: any = config.get('services.redis');
		const client: redis.RedisClient = await redis.createClient({
			host: configRedis.host,
			port: configRedis.port,
			password: configRedis.password,
		});
		client.on('connect', () => {
			global.logger.info(`Redis client connected to ${configRedis.host}:${configRedis.port}`);
		});
		client.on('error', (error) => {
			global.logger.error(error);
		});
		resolve(client);
	} catch (error) {
		reject(error);
	}
});
