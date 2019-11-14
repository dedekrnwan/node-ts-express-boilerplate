import express from 'express';

export default (structured: any, request: express.Request, response: express.Response, next: express.NextFunction): void => {
	global.logger.info(structured);
	response.status((structured.code) ? structured.code : 500).json(structured);
};
