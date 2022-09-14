const request = require('supertest');
const app = require('./app.js');

describe('GET /music', () => {
	test('should be ok, status 200', async () => {
		const response = await request(app).get('/music');
		expect(response.statusCode).toBe(200);
	});
	test('should return 10 artists', async () => {
		const response = await request(app).get('/music');
		expect(response.body.Music.length === 10).toBe(true);
	});
});

describe('GET /music/:artist', () => {
	test('should respond with correct Artist ', async () => {
		const response = await request(app).get('/music/Queen');
		expect(response.body.Artist === 'Queen').toBe(true);
	});
	test('should respond with 404', async () => {
		const response = await request(app).get('/music/321');
		expect(response.statusCode).toBe(404);
	});
	test('should respond Artist not found', async () => {
		const response = await request(app).get('/music/Disclosure');
		expect(response.text).toBe('Artist not found');
	});
});

describe('GET /music/:artist/:song', () => {
	test('should respond with correct Song ', async () => {
		const response = await request(app).get('/music/Sofie Tukker/Sun came up');
		expect(response.body.Song === 'Sun came up').toBe(true);
	});
	test('should respond with 404', async () => {
		const response = await request(app).get('/music/321/blah');
		expect(response.statusCode).toBe(404);
	});
	test('should respond Song not found', async () => {
		const response = await request(app).get('/music/Beatles/Nocturne');
		expect(response.text).toBe('Song not found');
	});
});
