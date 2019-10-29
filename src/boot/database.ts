import { Sequelize } from "sequelize"
import config from "config"

export default (): Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
        const databases:any = config.get('database')
        const promConnections = databases.map(database => new Promise<any>(async(resolve, reject) => {
            try {
                const connection = await new Sequelize(
                    database.db,
                    database.username,
                    database.password,
                    {
                        host: database.host,
                        port: database.port,
                        dialect: database.dialect,
                        logging: false
                    })
                connection.sync({
                    force: true
                })
                global.logger.info(`Connection to ${database.db} successfully connected`)
                resolve(connection)
            } catch (error) {
                reject(error)
            }
        }))
        const connections = await Promise.all(promConnections)
        // global.connections = connections
        resolve(connections)
    } catch (error) {
        reject(error)
    }
})