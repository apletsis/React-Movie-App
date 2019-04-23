import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { openMovieModal } from '../movie-modal/movie-modal.actions';

class MovieFavoritesComponent extends React.Component {

    render() {
        const { movie, openMovieModal, removeFromFavorites } = this.props;
        const poster = (movie.poster_path.endsWith('null')) ? 'https://www.freeiconspng.com/uploads/no-image-icon-6.png' : movie.poster_path;

        return (
            <Row className="mb-4">
                <Col sm={6} md={4}>
                    <img src={poster} className="img-fluid" alt='movie poster'
                        onClick={() => openMovieModal(movie.id)}
                    />
                </Col>
                <Col sm={6} md={8}>
                    <Row>
                        <div className="title-wrapper d-flex justify-content-between">
                            <h2 className="align-self-end">{movie.title}</h2>
                            <Button
                                className="movie-modal-btn"
                                onClick={() => {
                                    removeFromFavorites(movie);
                                }}
                            >Unfavorite</Button>
                        </div>
                        <div>
                            <p className="movie-overview">{movie.overview}</p>
                        </div>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default connect(
    () => ({}),
    { openMovieModal }
)(MovieFavoritesComponent);