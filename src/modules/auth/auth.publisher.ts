import { connectionRabbitmq, publish } from "./../../services/rabbitmq.service";
import { User } from "../../models";

const connection = connectionRabbitmq()

const Q_AUTH_LOGIN = 'auth:login'

export const authLogin = (user:User):Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
        delete user.password
        const pub = await publish({
            connection,
            queue: Q_AUTH_LOGIN,
            message: user
        })
        resolve(pub)
    } catch (error) {
        reject(error)
    }
})


export {
    Q_AUTH_LOGIN
}