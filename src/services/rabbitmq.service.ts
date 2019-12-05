import * as amqplib from 'amqplib';
import config from 'config';

export const connectionRabbitmq = (): Promise<amqplib.Connection> => new Promise<any>(async (resolve, reject) => {
	try {
		const connection = await amqplib
			.connect(`amqp://${config.get('services.rabbitmq.user')}:`
				+ `${config.get('services.rabbitmq.pass')}`
				+ `@${config.get('services.rabbitmq.host')}?heartbeat=60`);
		connection.on('error', (err) => {
			if (err.message !== 'Connection closing') {
				global.logger.error('Rabbitmq connection error', err);
			}
		});
		connection.on('close', () => {
			global.logger.error('Rabbitmq reconnecting');
			setTimeout(() => {
				connectionRabbitmq();
			}, 1000);
		});
		global.logger.info('Rabbitmq connected');
		resolve(connection);
	} catch (error) {
		setTimeout(() => {
			connectionRabbitmq();
		}, 1000);
		reject(error);
	}
});

export const publish = ({
	connection,
	queue,
	message,
}): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const channel = await connection.createChannel();
		await channel.assertQueue(queue, {
			durable: true,
		});
		const result = await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
		global.logger.info(`Message ${queue} has been sent`, result);
		resolve(result);
	} catch (error) {
		reject(error);
	}
});

export const consume = ({
	connection,
	queue,
	handler,
}): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const channel = await connection.createChannel();
		await channel.assertQueue(queue, {
			durable: true,
		});
		const message = await channel.consume(queue, (msg) => msg);
		const result = await handler(message);
		resolve(result);
	} catch (error) {
		reject(error);
	}
});

export default connectionRabbitmq;
