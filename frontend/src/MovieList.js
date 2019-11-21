import React, {Component} from "react";
import axios from 'axios'
import API_Movie from './API_Movie'
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import MovieDetails from "./MovieDetails";

export default class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
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
                <div className={"row"}>
                    {this.state.movieList.map(movieDetails =>
                        <MovieDetails details={movieDetails}/>)}
                </div>

            )
        }
    }

}