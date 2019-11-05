import { Error } from '../interfaces';

export class Exception extends Error {
  public success: boolean

  public message: string

  public code: number

  public flag: string

  public data: object

  public error: Error

  constructor(error: Error) {
  	super(error.message);
  	this.success = false;

  	this.code = error.code || 500;
  	this.message = error.message;
  	this.flag = 'Oops something went wrong';
  	if (error) {
  		this.error = error;
  	}
  }
}

export default Exception;
