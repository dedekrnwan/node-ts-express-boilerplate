import User from "../modules/user/user.model";
import UserAuthority from "../modules/user/userAuthority/userAuthority.model";
import Authority from "../modules/authority/authority.model";
import AuthorityAccess from "../modules/authority/authorityAccess/authorityAccess.model";
import Module from "../modules/module/module.model";
import connections from "../utils/connections";

const connection = connections('boilerplate')

const initializeTable = () => new Promise<any>(async (resolve, reject) => {
    try {
        await Module.sync({
            force: true
        })
        global.logger.info('Table module has been synced')
         
        await User.sync({
            force: true
        })
        global.logger.info('Table user has been synced')

        await Authority.sync({
            force: true
        })
        global.logger.info('Table authority has been synced')

        await UserAuthority.sync({
            force: true
        })
        global.logger.info('Table user authority has been synced')


        await AuthorityAccess.sync({
            force: true
        })
        global.logger.info('Table authority access has been synced')

        resolve(true)
    } catch (error) {
        reject(error)
    }
})



export {
    initializeTable,
    connection,
    User,
    Authority,
    Module,
    UserAuthority,
    AuthorityAccess,
}