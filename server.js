const app = require('./app');
const deezer = require('./deezer.js').loadData;
const port = 3000;

(async () => {
	app.set('musicChart', await deezer());
    
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
})();