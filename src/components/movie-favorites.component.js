import React from 'react';
import { observer, inject } from 'mobx-react'
import { Row, Col, Button } from 'react-bootstrap';

@inject("MovieAppStore")
@observer
class MovieFavoritesComponent extends React.Component {

    render() {
        const { movie, MovieAppStore, removeFromFavorites } = this.props;
        const poster = (movie.poster_path.endsWith('null')) ? 'https://www.freeiconspng.com/uploads/no-image-icon-6.png' : movie.poster_path;

        return (
            <Row className="mb-4 favorite-movie">
                <Col xs={6} sm={6} md={4}>
                    <img src={poster} className="img-fluid fav-movie-poster" alt='movie poster'
                        onClick={() => MovieAppStore.getMovieDetails(movie.id)}
                    />
                </Col>
                <Col xs={6} sm={6} md={8}>
                    <Row>
                        <div className="title-wrapper d-flex justify-content-between w-100">
                            <h2 className="align-self-md-start align-self-lg-end">{movie.title}</h2>
                            <Button
                                className="unfav-btn"
                                onClick={() => {
                                    removeFromFavorites(movie);
                                }}
                            >Unfavorite</Button>
                        </div>
                        <p className="movie-overview">{movie.overview}</p>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default MovieFavoritesComponent;