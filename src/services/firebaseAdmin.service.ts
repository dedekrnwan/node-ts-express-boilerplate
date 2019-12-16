import firebaseAdmin from 'firebase-admin';
import config from 'config';
import { IFirebaseAdminSendNotification } from '../interfaces';

export default class FirebaseAdminService {
    public admin: firebaseAdmin.app.App

    constructor() {
    	this.admin = firebaseAdmin.initializeApp({
    		credential: firebaseAdmin.credential.cert(config.get('services.firebase.credential')),
    		databaseURL: config.get('services.firebase.databaseUrl'),
    	});
    }

    public sendNotification = (data: IFirebaseAdminSendNotification): Promise<any> => new Promise<any>(async (resolve, reject) => {
    	try {
    		const notif = await this.admin.messaging().sendToDevice(data.firebaseToken, data.payload, data.options);
    		resolve(notif);
    	} catch (error) {
    		reject(error);
    	}
    })
}
