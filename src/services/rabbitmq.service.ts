import * as amqplib from 'amqplib'
import config from "config";

export const connectionRabbitmq = ():Promise<amqplib.Connection> => new Promise<any>(async (resolve, reject) => {
    try {
        const connection = await amqplib.connect(`amqp://${config.get('rabbitmq.user')}:${config.get('rabbitmq.pass')}@${config.get('rabbitmq.host')}?heartbeat=60`)
        connection.on('error', (err) => {
            if (err.message !== "Connection closing") {
                global.logger.error(`Rabbitmq connection error`, err)
            }
        })
        connection.on('close', () => {
            global.logger.error(`Rabbitmq reconnecting`)
            setTimeout(() => {
                connectionRabbitmq()
            }, 1000)
        })
        global.logger.error(`Rabbitmq connected`)
        resolve(connection)
    } catch (error) {
        setTimeout(() => {
            connectionRabbitmq()
        }, 1000)
        reject(error)
    }
})

export const publish = ({
    connection,
    queue,
    message
}) => new Promise<any>(async (resolve, reject) => {
    try {
        const channel = await connection.createChannel()
        await channel.assertQueue(queue, {
            durable: true
        })
        const result = await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
        global.logger.info(`Message ${queue} has been sent`, result)
        resolve(result)
    } catch (error) {
        reject(error)
    }
})

export const consume = ({
    connection,
    queue,
    handler
}) =>  new Promise<any>(async (resolve, reject) => {
    try {
        const channel = await connection.createChannel()
        await channel.assertQueue(queue, {
            durable: true
        })
        const message = await channel.consume(queue, message => message)
        const result = await handler(message)
        resolve(result)
    } catch (error) {
        reject(error)
    }
})

export default connectionRabbitmq