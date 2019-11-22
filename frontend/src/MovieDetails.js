import React, {Component} from 'react'
import Card from "react-bootstrap/Card";


export default class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"col-sm-4"}>
                <Card className={"text-justify m-0"}>
                    <Card.Img variant={"bottom"} src={this.props.details.poster}
                              style={{width: "100%", 'objectFit': "cover"}}/>
                    <Card.Body>
                        <Card.Header>
                            {this.props.details.movie} - {this.props.details.yearOfRelease}
                        </Card.Header>
                        <Card.Text>
                            {this.props.details.actors}
                        </Card.Text>
                        <Card.Subtitle className={"text-muted"}>
                            {this.props.details.duration} min
                        </Card.Subtitle>
                    </Card.Body>
                    <Card.Body>
                        <Card.Text>RTR: {this.props.details.rottenTomatoesScore}</Card.Text>
                        <Card.Text>BO: ${this.props.details.boxOffice}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}