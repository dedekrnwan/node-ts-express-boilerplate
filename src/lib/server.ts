import "localenv"
import app from "./app"
import listeners from "./../listeners"
import logger from './../utils/logger'
import { Logger } from 'pino'
import Authority from './../modules/authority/authority.model'
import UserAuthority from './../modules/user/userAuthority/userAuthority.model'
import AuthorityAccess from "../modules/authority/authorityAccess/authorityAccess.model"
import Module from "../modules/module/module.model"
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
        new Authority()
        new UserAuthority()
        new AuthorityAccess()
        new Module()
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
