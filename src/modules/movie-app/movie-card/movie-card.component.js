import React from 'react';
import { Card } from 'react-bootstrap';

class MovieCardComponent extends React.Component {
    constructor(props) {
        super(props);
        // Check if mouse hovering over the movie card
        this.state = {
            isMouseOver: false,
        };
    }

    render() {
        const { movie, openMovieModal } = this.props;

        return (
            <Card className="movie-card"
            onMouseOver={() => this.setState({isMouseOver: true})}
            onMouseLeave={() => this.setState({isMouseOver: false})}
            >
                <Card.Img src={movie.poster_path} alt="Card image" />
                {(this.state.isMouseOver) ? (
                    <Card.ImgOverlay>
                        <Card.Title>{movie.title}</Card.Title>
                    </Card.ImgOverlay>
                ) : null}
            </Card>
        );
    }
}

export default MovieCardComponent;