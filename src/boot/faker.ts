import UserModel from "../modules/user/user.model"
import faker from "faker"
import bcryptjs from "bcryptjs"

export default ():Promise<any> => new Promise(async (resolve, reject) => {
    try {
        setTimeout(async () => {
            for (let index = 0; index < 5; index++) {
                const card = faker.helpers.userCard()
                const password = bcryptjs.hashSync('secret', bcryptjs.genSaltSync(10))
                const user = await UserModel.create(<UserModel>{
                    name: card.name,
                    username: card.username,
                    email: card.email,
                    password: password,
                    birthdate: faker.date.past(),
                    phone: card.phone,
                    telephone: card.phone,
                    rememberToken: null,
                    verificationDate: null,
                    createdDate: new Date(),
                    createdId: null
                })
                global.logger.info({
                    message: 'User has been generated',
                    user
                })
            }
        }, 5000);
        resolve(true)
    } catch (error) {
        global.logger.error(error)
        reject(error)
    }
})