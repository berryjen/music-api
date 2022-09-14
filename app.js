const express = require('express');
const fs = require('fs');
const app = express();

var melody = {};
try {
	const data = fs.readFileSync('./data.json');
	melody = JSON.parse(data);
} catch (err) {
	console.log(`Error reading file from disk: ${err}`);
}

app.get('/music', (req, res) => {
	res.json(melody);
});

app.get('/music/:artist', (req, res) => {
	var result = melody.Music.find((obj) => {
		return obj.Artist === req.params.artist;
	});

	if (result !== undefined) {
		console.log(result);
		res.json(result);
	} else {
		res.status(404).send('Artist not found');
	}
});

app.get('/music/:artist/:song', (req, res) => {
	var result = melody.Music.find((obj) => {
		return obj.Song === req.params.song && obj.Artist === req.params.artist;
	});
	if (result !== undefined) {
		console.log(result);
		res.json(result);
	} else {
		res.status(404).send('Song not found');
	}
});

module.exports = app;
