import firebaseAdmin from 'firebase-admin';
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
    query?: any;
}

export interface IAuthorityCheck {
    action: 'AUTHOPE' | 'AUTHINS' | 'AUTHUPD' | 'AUTHDEL' | 'AUTHCONFIRM' | 'AUTHPRINT';
    modules: string;
    user?: User;
}

export interface IServerOptions {
    port: number;
    appName?: string;
    appVersion?: string;
}

export interface IFirebaseAdminSendNotification {
    firebaseToken: string;
    payload: firebaseAdmin.messaging.MessagingPayload;
    options?: firebaseAdmin.messaging.MessagingOptions;
}
