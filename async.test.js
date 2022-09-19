const request = require('supertest');
const app = require('./app.js');
const deezer = require('./deezer.js').loadData;

beforeAll(async () => {
	app.set('musicChart', await deezer());
	var melody = app.get("musicChart");
});

describe('GET /music', () => {
	test('should be ok, status 200', async () => {
		const response = await request(app).get('/music');
		expect(response.statusCode).toBe(200);
	});
	test('should return an artist', async () => {
		const response = await request(app).get('/music');
		console.log(response.body);
		expect(response.body.tracks.data[0]).toHaveProperty('artist.name');
	});
});

describe('GET /music/:artist', () => {
	test('should respond with correct Artist ', async () => {
		const response = await request(app).get('/music/Lost Frequencies');
		expect(response.body.artist.name === 'Lost Frequencies').toBe(true);
	});
	test('should respond with 500', async () => {
		const response = await request(app).get('/music/Blah');
		expect(response.statusCode).toBe(500);
	});
	test('should respond Invalid artist', async () => {
		const response = await request(app).get('/music/Matoma');
		expect(response.text).toBe('Invalid artist');
	});
});

describe('GET /music/:artist/:song', () => {
	test('should respond with correct Song ', async () => {
		const response = await request(app).get('/music/Tom Odell/Another Love');
		expect(response.body.title === 'Another Love').toBe(true);
	});
	test('should respond with 500', async () => {
		const response = await request(app).get('/music/321/blah');
		expect(response.statusCode).toBe(500);
	});
	test('should respond Invalid song', async () => {
		const response = await request(app).get('/music/Beatles/Nocturne');
		expect(response.text).toBe('Invalid song');
	});
});


/* describe('GET /music - extra tests', () => {
	test('should return an array of 10 artists', async () => {
		const response = await request(app).get('/music');

		// This is just a warm-up. You've already done this test before.
		// Replace the line below to confirm that array contains 10 artists
		// Do something different though, try: https://jestjs.io/docs/expect#tohavelengthnumber
		expect(response.body.Music).toHaveLength(10);
	});

	test('should have Sofie Tukker as the first artist in the array', async () => {
		const response = await request(app).get('/music');

		// Write a test (i.e. expect) that confirms 'Sofie Tukker' is the first 
		// artist returned in the array of Music.
		expect(response.body.Artist[0]).toBeFalsy();
	});

	test('should include an Artist for every item in the array', async () => {
		const response = await request(app).get('/music');

		// Write a test (i.e. expect) that confirms every item in the
		// array includes an Artist. I've modified the database so that
		// this will catch a typo.

		// I've left an example of a loop to look at every item in the array.
		// Your job is to replace the line beginning `expect`.
		response.body.Music.forEach(i => {
			expect(false).toBe(true);
		});
	});

	test('should include a valid Deezer URL for every item in the array', async () => {
		const response = await request(app).get('/music');

		// This time you get to write your own loop and expect line. Pay attention to the
		// wording of the test description. How do you test this is a Deezer URL and not 
		// a spotify URL?
		expect(false).toBe(true);
	});

	test('should not include a youtube URL in any item in the array', async () => {
		const response = await request(app).get('/music');

		// This time you get to write your own loop again, but you are looking for
		// a negative. You want to ensure that there are no YouTube URLs in the 
		// playlist.
		expect(false).toBe(true);
	});
}); */