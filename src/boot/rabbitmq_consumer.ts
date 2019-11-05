import rabbitmqService from '../services/rabbitmq.service';
import authSubscriber from '../modules/auth/auth.subscriber';

const subscriber = {
	...authSubscriber,
};

export default (): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const connection = await rabbitmqService();
		const channel = await connection.createChannel();
		const arrKeyHandler = Object.keys(subscriber);
		const promQueue = arrKeyHandler.map((key) => new Promise<any>(async (res, rej) => {
			try {
				await channel.assertQueue(key);
				const result = await channel.consume(key, async (message) => {
					let handler = null;
					if (message) {
						handler = await subscriber[key](message);
						channel.ack(message);
					}
					return handler;
				});
				global.logger.info(`Subscribe to ${key}`);
				res(result);
			} catch (error) {
				rej(error);
			}
		}));
		resolve(Promise.all(promQueue));
	} catch (error) {
		reject(error);
	}
});
