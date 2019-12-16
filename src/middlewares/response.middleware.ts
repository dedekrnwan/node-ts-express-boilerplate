/* eslint-disable dot-notation */
/* eslint-disable no-nested-ternary */
import express from 'express';
import Exception from '../utils/exception';

export default (structured: any, request: express.Request, response: express.Response, next: express.NextFunction): void => {
	if (structured instanceof Exception) {
		// request['apm'].captureError(structured);
	}
	// delete structured.query;
	global.logger.info(structured);
	// eslint-disable-next-line no-nested-ternary
	response.status((structured.code) ? Number.isInteger(structured.code) ? structured.code : 500 : 500).json(structured);
};
