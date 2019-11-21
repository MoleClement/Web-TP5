import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";


export default class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"container-fluid col-sm-4"}>
                <Card className={"text-justify"} style={{width: '18rem', margin: 'auto'}}>
                    <Card.Img variant={"top"} src={this.props.details.poster}
                              style={{width: "100%", height: "15vw", 'objectFit': "cover"}}/>
                    <Card.Body>
                        <Card.Header>
                            {this.props.details.movie} - {this.props.details.yearOfRelease}
                        </Card.Header>
                        <Card.Title>
                            {this.props.details.actors}
                        </Card.Title>
                        <Card.Subtitle className={"text-muted"}>
                            <small>{this.props.details.duration} min</small>
                        </Card.Subtitle>
                    </Card.Body>
                    <Card.Body>
                        <Card.Text>
                            <span>RTR: {this.props.details.rottenTomatoesScore}/100</span>
                            <span>BO: $ {this.props.details.boxOffice}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}