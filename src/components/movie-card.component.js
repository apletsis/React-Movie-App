import React from 'react';
import { Card } from 'react-bootstrap';

class MovieCardComponent extends React.Component {

    render() {
        const { movie } = this.props;
        const poster = (movie.poster_path.endsWith('null')) ? 'https://www.freeiconspng.com/uploads/no-image-icon-6.png' : movie.poster_path;

        return (
            <Card className="movie-card"
                onClick={() => console.log(movie.id)}
            >
                <Card.Img src={poster} alt="Card image" />
                <Card.ImgOverlay className="rounded-bottom">
                    <Card.Title className="text-truncate">{movie.title}</Card.Title>
                </Card.ImgOverlay>
            </Card>
        );
    }
}

export default MovieCardComponent;