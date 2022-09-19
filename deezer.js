var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.deezer.com/chart',
  headers: { }
};

 async function loadData() {
	return axios(config)
        .then(function (response) {
	    return response.data
    });
}

module.exports = {loadData};