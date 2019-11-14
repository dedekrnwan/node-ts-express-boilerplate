import User from '../modules/user/user.model';

export interface Error {
    flag?: string;
    message?: string;
    code?: number;
    port?: number;
}

export interface IResponse {
    // meta:IMeta,
    success?: boolean;
    code: number;
    flag: string;
    message: string;
    data?: any;
    error?: any;
}

export interface IAuthorityCheck {
    action: 'AUTHOPE' | 'AUTHINS' | 'AUTHUPD' | 'AUTHDEL' | 'AUTHCONFIRM' | 'AUTHPRINT';
    modules: string;
    user?: User;
}
