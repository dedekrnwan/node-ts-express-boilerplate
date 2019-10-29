import express from "express"
import { IResponse } from "./../interfaces"
import Exception from "../utils/exception"

export default (result: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
    let structured:IResponse
    if(result instanceof Error){
        structured = new Exception(result)
    }

    response.status((structured.code) ? structured.code : 500).json(<IResponse> structured)
}