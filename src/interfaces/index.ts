export interface Error {
    flag?: string
    message?: string
    code?:number
    port?:number
}

export interface IResponse {
    // meta:IMeta,
    success:boolean,
    code: number,
    flag:string,
    message:string,
    data?:any,
    error?:any
}
