import { IResponse } from '../interfaces';

export const response = {
	// #region 2**
	ok: ({
		flag = 'Ok',
		message = 'Process success',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 200,
	}),
	created: ({
		flag = 'Created',
		message = 'Data has been created',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 201,
	}),
	accepted: ({
		flag = 'Accepted',
		message = 'The request has been accepted for processing, '
        + 'but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 202,
	}),
	noContent: ({
		flag = 'No Content',
		message = 'The server successfully processed the request and is not returning any content.',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 204,
	}),
	// #endregion
	// #region 4**
	badRequest: ({
		flag = 'Bad Request',
		message = 'The server cannot or will not process the request due to an apparent client erro',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 400,
	}),
	forbidden: ({
		flag = 'Forbidden',
		message = 'The request contained valid data and was understood by the server, '
        + 'but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action ',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 403,
	}),
	notAcceptable: ({
		flag = 'Not Acceptable',
		message = 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 406,
	}),
	conflict: ({
		flag = 'Confliect',
		message = 'Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 409,
	}),
	unAuthorized: ({
		flag = '',
		message = 'Unaothorized',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 401,
	}),
	notFound: ({
		flag = '',
		message = 'Data not found',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 404,
	}),
	unProcessableEntity: ({
		flag = '',
		message = 'Unprocessable entity',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 422,
	}),
	// #endregion
	// #region 5**
	internalServerError: ({
		flag = '',
		message = 'Internal server error',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 500,
	}),
	serviceUnAvailable: ({
		flag = '',
		message = 'Service unavailable',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 503,
	}),
	notImplemented: ({
		flag = '',
		message = 'Not implemented',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 501,
	}),
	badGateway: ({
		flag = '',
		message = 'Bad gateway',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 501,
	}),
	unknownError: ({
		flag = '',
		message = 'Unkown error',
		data = {},
	}): IResponse => response.build({
		flag,
		message,
		data,
		code: 505,
	}),
	// #endregion
	// #region general
	build: (res: IResponse): IResponse => res,
	error: (res: IResponse): IResponse => ({
		code: res.code,
		flag: res.flag,
		message: res.message,
		error: res.data,
	}),
	// #endregion
};

export default response;
