import events from 'events'
import path from 'path'
import * as fs from 'fs'

export default ():Promise<events> => new Promise<events>(async (resolve, reject) => {
    try {
        const eventEmitter = new events()
        const bootDir = path.join(__dirname, '../listeners')
        const dirList = await fs.readdirSync(bootDir)
        const promiseDirList = dirList.map(dirName => new Promise(async (resolve, reject) => {
            try {
                const fName = path.join(bootDir, dirName)
                if (dirName.replace(/.ts/g, '') !== 'index') {
                    eventEmitter.on(dirName.replace(/.ts/g, ''), (data) => {
                        const file = (require(fName).default) ? require(fName).default(data) : null
                    })
                }
                resolve(dirName.replace(/.ts/g, ''))
            } catch (error) {
                reject(error)
            }
        }))
        const result = await Promise.all(promiseDirList)
        global.logger.info(`listening event ${JSON.stringify(result)}`)
        resolve(eventEmitter)
    } catch (error) {
        reject(error)
    }
})