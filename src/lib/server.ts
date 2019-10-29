import "localenv"
import app from "./app"
import listeners from "./../listeners"
import logger from './../utils/logger'
import { Logger } from 'pino'

declare global {
    namespace NodeJS {
        interface Global {
            logger:Logger
            connections:any,
        }
    }
}

global.logger = logger
global.logger.info(`Listening ${process.env.NODE_ENV} config`)

const application = new app()
application.run(3000).then(async (server) => {
    try {
        const eventEmitter = await listeners()
        setTimeout(() => {
            eventEmitter.emit('testing', {
                tes: 'some'
            })
        }, 5000)
    } catch (error) {
        global.logger.error(error)
    }
}).catch((error) => {
    global.logger.error(error)
})
