import twilio from 'twilio';
import config from 'config';

export default class Twilio {
	public client: twilio.Twilio;

	constructor() {
		this.client = twilio(config.get('services.twilio.account_id'), config.get('services.twilio.auth_token'));
	}

	public verify_request = (to: string): Promise<any> => new Promise<any>(async (resolve, reject) => {
		try {
			const result = await this.client.verify.services(config.get('services.twilio.sid')).verifications.create({
				to,
				channel: 'sms',
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	})

	public verify_validate = (to: string, code: string): Promise<any> => new Promise<any>(async (resolve, reject) => {
		try {
			const result = await this.client.verify.services(config.get('services.twilio.sid')).verificationChecks.create({
				to,
				code,
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	})
}
