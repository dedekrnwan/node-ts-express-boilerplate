import express from 'express'
import { IResponse } from "./../interfaces"

export const response = {
    //#region 2**
    ok : ({
        flag = '',
        message = 'OK',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 200,
    }),
    created : ({
        flag = '',
        message = 'Data Created',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 201,
    }),
    accepted : ({
        flag = '',
        message = 'Accepted',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 202,
    }),
    noContent : ({
        flag = '',
        message = 'No Content',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 204,
    }),
    //#endregion
    //#region 4**
    badRequest : ({
        flag = '',
        message = 'Bad Request',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 400,
    }),
    forbidden : ({
        flag = '',
        message = 'Forbidden',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 403,
    }),
    notAcceptable : ({
        flag = '',
        message = 'Not Acceptable',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 406,
    }),
    conflict : ({
        flag = '',
        message = 'Conflict',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 409,
    }),
    unAuthorized : ({
        flag = '',
        message = 'Unaothorized',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 401,
    }),
    notFound : ({
        flag = '',
        message = 'Data not found',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 404,
    }),
    unProcessableEntity : ({
        flag = '',
        message = 'Unprocessable entity',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 422,
    }),
    //#endregion
    //#region 5**
    internalServerError: ({
        flag = '',
        message = 'Internal server error',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 500,
    }),
    serviceUnAvailable: ({
        flag = '',
        message = 'Service unavailable',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 503,
    }),
    notImplemented: ({
        flag = '',
        message = 'Not implemented',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 501,
    }),
    badGateway: ({
        flag = '',
        message = 'Bad gateway',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 501,
    }),
    unknownError: ({
        flag = '',
        message = 'Unkown error',
        data = {}
    }):IResponse => response.build(<IResponse> {
        flag,
        message,
        data,
        code: 505,
    }),
    //#endregion
    //#region general
    build : (response:IResponse):IResponse => response,
    error: (response:IResponse):IResponse => {
        return {
            code: response.code,
            success: response.success,
            flag: response.flag,
            message: response.message,
            error: response.data
        }
    }
    //#endregion
}

export default response
