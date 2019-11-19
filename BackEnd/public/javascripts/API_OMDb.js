let axios = require('axios');

const API_URL = "http://www.omdbapi.com/?";
const API_KEY_URL = "&apikey=f7a4b76f";
const API_KEY_TITLE = "t=";

class API_Movie {
    constructor() {
    }

    // Request to OMDb API
    // Return a promise
    fetchMovieByTitle(movieTitle) {
        return axios
            .get(`${API_URL}${API_KEY_TITLE}${movieTitle}${API_KEY_URL}`);
    }

}

module.exports = API_Movie;