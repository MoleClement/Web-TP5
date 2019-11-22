import React, {Component} from "react";
import API_Movie from './API_Movie'
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
            this.setState({movieList: response.data.movies});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.movieIndex !== this.props.movieIndex) {
            this.getMoviesData();
        }
    }

    render() {

        if (!this.state.movieList) {
            return (<div/>)
        } else {
            return (
                <div className={"row"}>
                    {this.state.movieList.map(movieDetails =>
                        <MovieDetails details={movieDetails}/>)}
                </div>
            );
        }
    }
}