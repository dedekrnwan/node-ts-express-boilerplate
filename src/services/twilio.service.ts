import twilio from 'twilio';
import config from 'config';

export const client = (): Promise<twilio.Twilio> => new Promise<twilio.Twilio>(async (resolve, reject) => {
	try {
		const result = await twilio(config.get('services.twilio.account_id'), config.get('services.twilio.auth_token'));
		resolve(result);
	} catch (error) {
		reject(error);
	}
});

export default (): Promise<twilio.Twilio> => new Promise<twilio.Twilio>(async (resolve, reject) => {
	try {
		const result = await client();
		resolve(result);
	} catch (error) {
		reject(error);
	}
});
