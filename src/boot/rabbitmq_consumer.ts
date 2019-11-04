import rabbitmqService from '../services/rabbitmq.service'
import authSubscriber from "./../modules/auth/auth.subscriber";

let subscriber = {
    ...authSubscriber
}

export default ():Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
        const connection = await rabbitmqService()
        const channel = await connection.createChannel()
        const arrKeyHandler = Object.keys(subscriber)
        const promQueue = arrKeyHandler.map(key => new Promise<any>(async (resolve, reject) => {
            try {
                const queue = await channel.assertQueue(key)
                const result = await channel.consume(key, async (message) => {
                    let result = null
                    if (message) {
                        result = await subscriber[key](message)
                        channel.ack(message)
                    }
                    return result
                })
                global.logger.info(`Subscribe to ${key}`)
                resolve(result)
            } catch (error) {
                reject(error)
            }
        }))
        resolve(Promise.all(promQueue))
    } catch (error) {
        reject(error)
    }
})