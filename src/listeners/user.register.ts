import Mailer from '../services/mailer.service';
import Twilio from '../services/twilio.service';

const mailer = new Mailer();
const twilio = new Twilio();

const sendMailWelcomeMessage = (to: string): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const result = await mailer.transporter.sendMail({
			from: 'admin@coreplate.com',
			sender: 'admin@coreplate.com',
			to,
			text: 'Anjayyyyyyyyyyyyy',
		});
		resolve(result);
	} catch (error) {
		reject(error);
	}
});
const sendSmsVerificationNumber = (to: string): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const result = await twilio.verify_request(to);
		resolve(result);
	} catch (error) {
		reject(error);
	}
});

export default (data): Promise<any> => new Promise<any>(async (resolve, reject) => {
	try {
		const promMail = sendMailWelcomeMessage(data.user.email || 'dekur98@gmail.com');
		const promSms = sendSmsVerificationNumber(data.user.phone || '+6285894725654');
		const result = await Promise.all([
			promMail,
			promSms,
		]);
		resolve(result);
	} catch (error) {
		reject(error);
	}
});
