import Events from 'events';
import path from 'path';
import * as fs from 'fs';

export default (): Promise<Events> => new Promise<Events>(async (resolve, reject) => {
	try {
		const eventEmitter = new Events();
		const bootDir = path.join(__dirname, '../listeners');
		const dirList = await fs.readdirSync(bootDir);
		const promiseDirList = dirList.map((dirName) => new Promise(async (res, rej) => {
			try {
				const fName = path.join(bootDir, dirName);
				if (dirName.replace(/.ts/g, '') !== 'index') {
					eventEmitter.on(dirName.replace(/.ts/g, ''), (data) => {
						if (require(fName).default) {
							require(fName).default(data);
						}
					});
				}
				res(dirName.replace(/.ts/g, ''));
			} catch (error) {
				rej(error);
			}
		}));
		const result = await Promise.all(promiseDirList);
		global.logger.info(`listening event ${JSON.stringify(result)}`);
		resolve(eventEmitter);
	} catch (error) {
		reject(error);
	}
});
