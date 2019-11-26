/* eslint-disable dot-notation */
/* eslint-disable no-nested-ternary */
import express from 'express';
import Exception from '../utils/exception';

export default (structured: any, request: express.Request, response: express.Response, next: express.NextFunction): void => {
	if (structured instanceof Exception) {
		// request['apm'].captureError(structured);
	}
	global.logger.info(structured);
	response.status((structured.code) ? Number.isInteger(structured.code) ? structured.code : 500 : 500).json(structured);
};
