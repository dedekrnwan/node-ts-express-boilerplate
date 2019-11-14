/* eslint-disable no-undef */

import supertest from 'supertest';
import App from '../src/lib/app';
import AuthController from '../src/modules/auth/auth.controller';

const request = supertest(new App().app);

describe('Accessing controllers', () => {
	// beforeAll(() => elasticsearchService());
	[
		AuthController,
	].forEach((controller) => {
		const prefix = Reflect.getMetadata(`${controller.name}:prefix`, controller);
		const routes: any[] = Reflect.getMetadata(`${controller.name}:routes`, controller);
		routes.forEach((route: any) => {
			test(`Test of ${prefix}${route.path}, should get 200 or 401 status code`, async (done) => request[route.method](`${prefix}${route.path}`).then((response) => {
				expect(response.status === 200 || response.status === 400).toBeTruthy();
				done();
			}));
		});
	});
});
