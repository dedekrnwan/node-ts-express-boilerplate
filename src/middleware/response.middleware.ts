import express from 'express';
import { IResponse } from '../interfaces';

export default (structured: any, request: express.Request, response: express.Response, next: express.NextFunction): void => {
	global.logger.info(structured);
	response.status((structured.code) ? Number.isInteger(structured.code) ? structured.code :500 : 500).json(structured);
};
