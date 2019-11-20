import express from 'express';

export default (structured: any, request: express.Request, response: express.Response, next: express.NextFunction): void => {
	global.logger.info(structured);
	let code: number;
	if (structured.code && Number.isInteger(structured.code)) {
		code = structured.code;
	} else {
		code = 500;
	}
	response.status(code).json(structured);
};
