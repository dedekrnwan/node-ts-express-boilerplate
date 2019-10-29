import express from 'express'
import { Exception } from '../utils/exception'
import response from '../utils/response'
import jwt from '../utils/jwt'

export default {
    authenticated : async (req: express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {
        try {
            const token:string = req.headers['authorization']
            if (token) {
                const result = await jwt.verify(token)
                if (result) {
                    const user = await jwt.decode(token)
                    req['user'] = user
                    next()
                }else {
                    next(response.unAuthorized({
                        flag: 'Unauthorized',
                        message: 'Access denied, Token is invalid'
                    }))
                }
            }else {
                next(response.unAuthorized({
                    flag: 'Unauthorized',
                    message: 'Access denied, No token provided'
                }))
            }
        } catch (error) {
            next(error)
        }
    },
    authorized : async (req: express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {
        try {
            next(new Exception({
                message: 'Authoried function not already',
                code: 500
            }))
        } catch (error) {
            next(error)
        }
    }
}