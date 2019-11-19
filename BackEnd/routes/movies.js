let express = require('express');
let router = express.Router();
const _ = require('lodash');
const API_Movie = require('../public/javascripts/API_OMDb');

let movies = [];
let movieAPI = new API_Movie();

/* GET movies listing. */
router.get('/', function (req, res) {
    res.status(200).json({movies: movies});
});

/* GET movie by ID */
router.get('/:id', function (req, res) {
    const id = req.params.id;
    if(req.params.length>0)
        res.status(404).json({
            message: `id: ${id}`
        });
    if (id) {
        const movieSelected = _.find(movies, ["id", id]);

        if (!movieSelected) {
            res.status(404).json({
                message: 'Movie not found. You may want to add it to your list first before using specific access statement'
            });
        } else {
            res.status(200).json({
                message: 'Movie found',
                id: id,
                movie: movieSelected.movie,
                yearOfRelease: movieSelected.yearOfRelease,
                duration: movieSelected.duration,
                actors: movieSelected.actors,
                poster: movieSelected.poster,
                boxOffice: movieSelected.boxOffice,
                rottenTomatoesScore: movieSelected.rottenTomatoesScore
            });
        }
    }    else {
        res.status(404).json({
           message: 'ID tag parameter can not be empty! Please refer an id in the request'
        });
    }
});

/* POST (insert) a movie by title */
router.post('/', (req, res) => {
    const movieTitle = req.body.movieTitle;

    if (!movieTitle) {
        res.status(404).json({
            message: 'Movie title can not be undefined ! Please make sure to insert a proper name'
        });
    } else {

        const movieSelected = _.find(movies, ["movie", movieTitle]);
        if (!movieSelected) {
            const addedMovie = movieAPI.fetchMovieByTitle(movieTitle).then(function (response) {
                // Get data from the API
                const data = response.data;
                if (response.data.Response === "True") {// Get the main data
                    const id = data.imdbID;
                    const movie = data.Title;
                    const yearOfRelease = parseInt(data.Year);
                    const duration = parseInt(data.Runtime);
                    const actors = data.Actors.split(", ");
                    const poster = data.Poster;
                    const boxOffice = data.BoxOffice;
                    const rottenTomatoesScore = parseInt(data.Ratings[1].Value.replace('%', ''));

                    movies.push({
                        id: id,
                        movie: movie,
                        yearOfRelease: yearOfRelease,
                        duration: duration,
                        actors: actors,
                        poster: poster,
                        boxOffice: boxOffice,
                        rottenTomatoesScore: rottenTomatoesScore
                    });

                    res.status(201).json({
                        message: `Movie successfully added to your list ${movie}`,
                        id: id,
                        yearOfRelease: yearOfRelease,
                        duration: duration,
                        actors: actors,
                        poster: poster,
                        boxOffice: boxOffice,
                        rottenTomatoesScore: rottenTomatoesScore
                    })

                } else {
                    res.status(404).json({
                            error: `Error: ${response.data.Error}`
                        }
                    );
                }
            })
                .catch(function (error) {
                    // Display an error
                    console.error(error);
                });
        } else {
            res.status(409).json({
                Error: 'Movie already exist !'
            })
        }

    }
});

/* PUT (update) a movie rating by id */
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const modifiedRating = req.body.movieRating;

    const movieSelected = _.find(movies, ["id", id]);
    if(id)
    {
        if (!movieSelected) {
            res.status(404).json({
                message: 'Movie not found. You may want to add it to your list first before using update statement'
            });
        } else {
            if (modifiedRating) {
                movieSelected.rottenTomatoesScore = parseInt(modifiedRating);

                res.status(200).json({
                    message: `Movie ${movieSelected.id} rating has been had been updated`
                })
            } else {
                res.status(204).json({
                    message: `Content empty ! Please make sure to update with valid data !`
                })
            }
        }
    }else{
        res.status(404).json({
            message: 'ID tag parameter can not be empty! Please refer an id in the request'
        });
    }
});


/* DELETE a movie by ID */
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({
            message: 'Movie not found. Can not delete empty row'
        });
    } else {
        _.remove(movies, movies => movies.id === id);
        if (!_.find(movies, ["id", id])) {
            res.status(200).json({
                message: `The movie referenced ${id} has been successfully deleted from your list !`
            })
        } else {
            res.status(409).json({
                message: `The movie referenced ${id} has been found but deletion failed !`
            })
        }
    }
});

/* DELETE all movies */
router.delete('/', (req, res) => {

    _.remove(movies);
    if (movies.length === 0) {
        res.status(200).json({
            message: `your movie list has successfully been cleared !`
        })
    } else {
        res.status(409).json({
            message: `Failed attempt to clear your list !`
        })
    }
});

module.exports = router;
