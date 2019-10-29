import UserModel from './../user/user.model'
import bcryptjs from 'bcryptjs'
import jwt from './../../utils/jwt'
import response from '../../utils/response'

export interface AuthLogin {
    email:string,
    password:string
}

export interface AuthRegister {
    name:string
    username:string | null
    email:string
    password?:string | null
    birthdate?:Date | null
    phone?:string | null
    telephone?:string | null
    rememberToken?:string | null
    verificationDate?:Date | null
    createdDate?:Date | null
    createdId?:number | null
    updatedDate?:Date | null
    updatedId?:number | null
    facebookId?:bigint | null
    githubId?:bigint | null
    googleId?:bigint | null
    linkedinId?:bigint | null
    twitterId?:bigint | null
}

export const login = (credentials:AuthLogin):Promise<any> =>  new Promise<any>(async (resolve, reject) => {
    try {
        const user = await UserModel.findOne({
            where: {
                email: credentials.email
            }
        })
        if (user) {
            const comparePassword = await bcryptjs.compare(credentials.password, user.password)
            if (comparePassword) {
                // register jwt
                const token = await jwt.sign({
                    id: user.id
                })
                resolve(token)
            }else {
                reject(response.badRequest({
                    message: 'Email or password is invalid',
                }))
            }
        }else {
            reject(response.badRequest({
                message: 'Email or password is invalid',
            }))
        }
    } catch (error) {
        reject(error)
    }
})


export const register = (data:AuthRegister):Promise<any> =>  new Promise<any>(async (resolve, reject) => {
    try {
        if (await UserModel.count({
            where: {
                email: data.email
            }
        }) <= 0) {
            if (await UserModel.count({
                where: {
                    username: data.username
                }
            }) <= 0) {
                const user = await UserModel.create(<UserModel>{
                    ...data,
                    password: await bcryptjs.hashSync(data.password, await bcryptjs.genSaltSync(10)),
                    createdDate: new Date(),
                    updatedDate: new Date()
                })
                const token = await jwt.sign({
                                id: user.id
                })
                resolve(token)
            }else{ 
                reject(response.badRequest({
                    message: 'Username already exists',
                }))
            }
        }else{ 
            reject(response.badRequest({
                message: 'Email already exists',
            }))
        }
        // if (user) {
        //     const comparePassword = await bcryptjs.compare(credentials.password, user.password)
        //     if (comparePassword) {
        //         // register jwt
        //         const token = await jwt.sign({
        //             id: user.id
        //         })
        //         resolve(token)
        //     }else {
        //         reject(response.badRequest({
        //             message: 'Email or password is invalid',
        //         }))
        //     }
        // }else {
        //     reject(response.badRequest({
        //         message: 'Email or password is invalid',
        //     }))
        // }
    } catch (error) {
        reject(error)
    }
})