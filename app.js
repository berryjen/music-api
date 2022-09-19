const express = require('express');
const fs = require('fs');
const app = express();
var axios = require('axios');

var melody = {};
var config = {
  method: 'get',
  url: 'https://api.deezer.com/chart',
  headers: { }
};

app.get('/music', (req, res) => {
	var melody = app.get("musicChart");
	res.json(melody);
});

app.get('/music/:artist', (req, res) => {
	var melody = app.get("musicChart");
	var result = melody.tracks.data.find((track) => {
		return track.artist.name === req.params.artist;
	});

	if (result !== undefined) {
		console.log(result);
		res.json(result);
	} else {
		res.status(500).send('Invalid artist');
	}
});

app.get('/music/:artist/:song', (req, res) => {
	var melody = app.get("musicChart");
	var result = melody.tracks.data.find((track) => {
		return track.title === req.params.song && track.artist.name === req.params.artist;
	});
	if (result !== undefined) {
		console.log(result);
		res.json(result);
	} else {
		res.status(500).send('Invalid song');
	}
});

module.exports = app;
