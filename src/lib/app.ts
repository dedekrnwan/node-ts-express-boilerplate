import express from 'express';
import http from 'http';
import path from 'path';
import * as fs from 'fs';
import config from 'config';
import Events from 'events';
import kernel from './kernel';

export default class App {
    app: express.Application

    server: any

    connections: any

    constructor() {
    	this.app = express();
    	this.boot().then((result) => {

    	}).catch((error) => {
    		global.logger.error(error);
    	});
    	this.burn(this.app);
    	const eventEmitter = new Events();
    	eventEmitter.emit('testing');
    	this.static();
    }

    boot = (): Promise<any> => new Promise<any>(async (resolve, reject) => {
    	try {
    		const bootDir = path.join(__dirname, '../boot');
    		const dirList = await fs.readdirSync(bootDir);
    		const promiseDirList = dirList.map((dirName) => new Promise(async (res, rej) => {
    			try {
    				const fName = path.join(bootDir, dirName);
    				const file = (require(fName).default) ? await require(fName).default() : fName;
    				if (dirName === 'database.ts') {
    					this.connections = file;
    				}
    				res(file);
    			} catch (error) {
    				rej(error);
    			}
    		}));
    		const result = await Promise.all(promiseDirList);
    		resolve(result);
    	} catch (error) {
    		reject(error);
    	}
    })

    burn = async (apps: express.Application): Promise<void> => {
    	try {
    		this.app.disabled('x-powered-by');
    		this.app.disabled('etag');
    		this.app = await kernel(apps);
    	} catch (error) {
    		global.logger.error(error);
    	}
    }

    static = async (): Promise<void> => {
    	try {
    		await this.app.use('/public', express.static(path.join(__dirname, '../../public')));
    	} catch (error) {
    		global.logger.error(error);
    	}
    }

    run = (port: number): Promise<any> => new Promise<any>(async (resolve, reject) => {
    	try {
    		this.server = http.createServer(this.app);
    		this.server.listen(port, () => {
    			global.logger.info(`${config.get('server.name')} listening on the port ${port}`);
    			resolve(this.server);
    		}).on('error', (error) => {
    			reject(error);
    		});
    	} catch (error) {
    		reject(error);
    	}
    })
}
