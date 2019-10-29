import fs from 'fs'
import path from 'path'
import config from "config"
import jsonwebtoken from 'jsonwebtoken'

export default {
    sign: async(data:object): Promise<string> => new Promise<any>(async (resolve, reject) => {
       try {
            const privateKey = await path.join(__dirname, `../utils/key/private.key`)
            fs.readFile(privateKey, (err, result) => {
                if (err) {
                    reject(err)
                }
                const signOptions = config.get('jwt.options.create')
                jsonwebtoken.sign(data, result, signOptions, (err, token) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(token)
                })
            })
       } catch (error) {
           reject(error)
       } 
    }),
    decode: async (token:string):Promise<object> => new Promise<any>(async (resolve, reject) => {
        try {
            const result = await jsonwebtoken.decode(token, {
                complete: true
            })
            resolve(result)
        } catch (error) {
            reject(error)
        }
    }),
    verify: async (token:string, publicKey?:string):Promise<boolean> => new Promise<any>(async (resolve, reject) => {
        try {
            const privateKey = await path.join(__dirname, `../utils/key/private.key`)
            fs.readFile(privateKey, 'utf-8', (err, result) => {
                if (err) {
                    reject(err)
                }
                const key = (publicKey) ? publicKey : result
                jsonwebtoken.verify(token, key, config.get('jwt.options.verify'), (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}