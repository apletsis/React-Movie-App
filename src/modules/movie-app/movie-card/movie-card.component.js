import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { openMovieModal } from '../movie-modal/movie-modal.actions';

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
        const poster = (movie.poster_path.endsWith('null')) ? 'https://www.freeiconspng.com/uploads/no-image-icon-6.png' : movie.poster_path;

        return (
            <Card className="movie-card"
                onMouseOver={() => this.setState({ isMouseOver: true })}
                onMouseLeave={() => this.setState({ isMouseOver: false })}
                onClick={() => openMovieModal(movie.id)}
            >
                <Card.Img src={poster} alt="Card image" />
                {(this.state.isMouseOver) ? (
                    <Card.ImgOverlay className="rounded-bottom">
                        <Card.Title className="text-truncate">{movie.title}</Card.Title>
                    </Card.ImgOverlay>
                ) : null}
            </Card>
        );
    }
}

export default connect(
    () => ({}),
    { openMovieModal }
)(MovieCardComponent);