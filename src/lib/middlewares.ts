import express from 'express'
import cors from 'cors'
import { default as ErrorMiddleware } from "../middleware/error.middleware"
import { default as ResponseMiddleware } from "../middleware/response.middleware"
import helmet from "helmet"
import expressPinoLogger from 'express-pino-logger'
import logger, { stream } from '../utils/logger'

export const before = (app:express.Application): Promise<express.Application> => {
    return new Promise<express.Application>(async (resolve, reject) => {
        try {
            let middlewares:Function[]
            middlewares = [
                helmet(),
                cors(),
                express.json(),
                express.urlencoded({
                    extended: true
                }),
                expressPinoLogger({ logger }, stream),
            ]
            middlewares.forEach(async (middlewares:any) => {
                await app.use(middlewares)
            })
            resolve(app)
        } catch (error) {
            reject(error)
        }
    })
}

export const after = (app:express.Application): Promise<express.Application> => {
    return new Promise<express.Application>(async (resolve, reject) => {
        try {
            let middlewares:Function[]
            middlewares = [
                ResponseMiddleware
            ]
            middlewares.forEach(async (middlewares:any) => {
                await app.use(middlewares)
            })
            resolve(app)
        } catch (error) {
            reject(error)
        }
    })
}

export const error = (app:express.Application): Promise<express.Application> => {
    return new Promise<express.Application>(async (resolve, reject) => {
        try {
            let middlewares:Function[]
            middlewares = [
                ErrorMiddleware
            ]
            middlewares.forEach(async (middlewares:any) => {
                await app.use(middlewares)
            })
            resolve(app)
        } catch (error) {
            reject(error)
        }
    })
}