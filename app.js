const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

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
	res.json(result);
});

app.get('/music/:artist/:song', (req, res) => {
	var result = melody.Music.find((obj) => {
		return obj.Song === req.params.song && obj.Artist === req.params.artist;
	});
	res.json(result);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
