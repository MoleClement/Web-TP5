let axios = require('axios');

const API_URL = "http://localhost:3000/";
const API_KEY_MOVIES = "movies";

class API_Movie {
    constructor() {
    }

    // Request to Movie API

    // Return all movies
    fetchMovies() {
        console.log(`${API_URL}${API_KEY_MOVIES}/`);
        return axios
            .get(`${API_URL}${API_KEY_MOVIES}/`);
    }

    // Return movie by ID
    fetchMovieByTitle(movieID) {
        return axios
            .get(`${API_URL}${API_KEY_MOVIES}/${movieID}`);
    }

    /// Add a movie to the list by Movie Title
    addMovieByTitle(movieTitle) {
        return axios
            .post(`${API_URL}${API_KEY_MOVIES}/`, {movieTitle: movieTitle});

    }

    /// Update the rating for a given movie
    updateMovieRatingById(id, newRating) {
        return axios.put(`${API_URL}${API_KEY_MOVIES}/${id}`, {movieRating: newRating});
    }

    /// Delete all the movies from the list
    deleteMovies() {

        return axios
            .delete(`${API_URL}${API_KEY_MOVIES}/`);
    }

    deleteMovieById(id) {
        return axios
            .delete(`${API_URL}${API_KEY_MOVIES}/${id}`);
    }

}

export default API_Movie;