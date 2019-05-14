import React from 'react';
import { Card } from 'react-bootstrap';
import { observer, inject } from 'mobx-react'

@inject("MovieAppStore")
@observer
class MovieCardComponent extends React.Component {

    render() {
        const { movie, MovieAppStore } = this.props;
        const poster = (movie.poster_path.endsWith('null')) ? 'https://www.freeiconspng.com/uploads/no-image-icon-6.png' : movie.poster_path;

        return (
            <Card className="movie-card"
                onClick={() => MovieAppStore.getMovieDetails(movie.id)}
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