import express from 'express';

export default (structured: any, request: express.Request, response: express.Response, next: express.NextFunction): void => {
	global.logger.info(structured);
	// eslint-disable-next-line no-nested-ternary
	response.status((structured.code) ? (Number.isInteger(structured.code)) ? structured.code : 500 : 500).json(structured);
};
