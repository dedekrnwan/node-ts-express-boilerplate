import Events from 'events';
import path from 'path';
import * as fs from 'fs';

export default (): Promise<Events.EventEmitter> => new Promise<Events.EventEmitter>(async (resolve, reject) => {
	try {
		const eventEmitter = new Events.EventEmitter();
		const bootDir = path.join(__dirname, '../listeners');
		const dirList = await fs.readdirSync(bootDir);
		const promiseDirList = dirList.map((dirName) => new Promise((res, rej) => {
			try {
				const fName = path.join(bootDir, dirName);
				if (dirName.replace(/.ts/g, '').replace(/.js/g, '') !== 'index') {
					eventEmitter.on(dirName.replace(/.ts/g, '').replace(/.js/g, ''), (data) => {
						setImmediate(() => {
							const file = (require(fName).default) ? require(fName).default(data).then((result) => {
								if (typeof result === 'string') {
									global.logger.info(result);
								} else {
									global.logger.info((result.message) ? result.message : result);
								}
							}).catch((err) => {
								global.logger.error(err);
							}) : null;
						});
					});
				}
				res(dirName.replace(/.ts/g, '').replace(/.js/g, ''));
			} catch (error) {
				rej(error);
			}
		}));
		const result = await Promise.all(promiseDirList);
		result.forEach((dir: string) => {
			global.logger.info(`listening event ${dir} ${Events.EventEmitter.listenerCount(eventEmitter, dir)} times`);
		});
		resolve(eventEmitter);
	} catch (error) {
		reject(error);
	}
});
