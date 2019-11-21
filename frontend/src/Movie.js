import React, {Component} from "react";
import axios from 'axios'
import API_Movie from './API_Movie'
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";

export default class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.movieInput = React.createRef();
    }

    componentDidMount() {
        this.getMoviesData();
    }

    getMoviesData() {
        let api_movie = new API_Movie();
        api_movie.fetchMovies().then(response => {
            this.setState({movieList: response.data.MovieList});
        });
    }

    handleClickAdd() {

        let api_movie = new API_Movie();
        if (this.movieInput.current.value) {
            api_movie.addMovieByTitle(this.movieInput.current.value);
            console.log(this.movieInput.current.value);
        }
    }

    handleClickDelete() {
        let api_movie = new API_Movie();
        api_movie.deleteMovies();

    }

    handleClickUpdateByRating(idToUpdate, newRating) {
        let api_movie = new API_Movie();
        api_movie.updateMovieRatingById(idToUpdate, newRating)
    }

    handleClickDeleteById(idToDelete) {
        let api_movie = new API_Movie();
        api_movie.deleteMovieById(idToDelete)
    }

    render() {

        if (!this.state.movieList)
            return (
                <div className={"container"}>
                    <InputGroup>
                        <FormControl
                            ref={this.movieInput}
                            type={"text"}
                            placeholder="Movie to add"
                            aria-label="Movie Title"
                            aria-describedby="movie-title"
                        />
                        <InputGroup.Append>
                            <Button variant={"outline-secondary"} onClick={() => {
                                this.handleClickAdd()
                            }}>Add</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <p>No Movie in your list yet</p>
                </div>
            );
        else {
            return (
                <div className={"container"}>
                    <InputGroup style={{padding: 20}}>
                        <FormControl
                            ref={this.movieInput}
                            type={"text"}
                            placeholder="Movie to search"
                            aria-label="Movie Title"
                            aria-describedby="movie-title"
                        />
                        <InputGroup.Append>
                            <Button variant={"outline-secondary"} onClick={() => this.handleClickAdd()}
                                    id="movie-title">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <MovieList className={"container"}/>
                </div>

            )
        }
    }

}