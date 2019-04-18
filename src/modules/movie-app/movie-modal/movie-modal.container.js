import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { openMovieModal, closeMovieModal, nextMovieModal } from './movie-modal.actions';
import { getMovieDetails } from '../movie-app.actions';
import * as movieHelpers from '../movie-app.helpers';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { isUndefined, isNullOrUndefined } from 'util';

class MovieModalContainer extends React.Component {

    // Triggered after property is changed
    componentWillReceiveProps(nextProps) {
        // If we will receive a new movieId
        if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
            nextProps.getMovieDetails(nextProps.movieId);
        }
    }

    render() {
        const { isOpen, closeMovieModal, moviesList } = this.props;
        const movie = movieHelpers.updateMoviePicturesUrls(this.props.movie);
        const movieReleaseDate = !isUndefined(movie.release_date) ? movie.release_date : undefined;
        const rating = !isUndefined(movie.adult) ? movie.adult : undefined;
        const movies = movieHelpers.getMoviesList(moviesList.response);

        const goToNextMovie = (movies) => {
            const currentArrayIndex = movies.findIndex(x => x.id === this.props.movieId);
            const nextIndex = currentArrayIndex + 1;
            if (nextIndex === movies.length) {
                // moviesList.request.page += 1;
                console.log(this.props);
            } else {
                const nextMovieId = movies[nextIndex]['id'];
                this.props.nextMovieModal(nextMovieId);
            }
        }

        const formatDate = (date) => {
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return monthNames[monthIndex] + ' ' + day + ', ' + year;
        }

        return (
            <div>
                <Modal
                    show={isOpen}
                    onHide={closeMovieModal}
                    size="lg"
                >
                    <Modal.Header>
                        <Button variant="link" onClick={() => closeMovieModal()} className="modal-header-btn back">
                            <FontAwesomeIcon icon={faChevronCircleLeft} className="modal-btn-icon" /> Back to list
                        </Button>
                        <Button variant="link" onClick={() => goToNextMovie(movies)} className="modal-header-btn next">
                            Next Movie <FontAwesomeIcon icon={faChevronCircleRight} className="modal-btn-icon" />
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container-fluid h-100 d-flex align-items-center">
                            <Row className="w-100">
                                <Col xs={6} sm={6} md={6} lg={4}>
                                    <img src={movie.poster_path} alt='movie poster' />
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={8}>
                                    <div className="title-wrapper d-flex justify-content-between">
                                        <h2 className="align-self-end">{movie.title}</h2>
                                        <Button className="movie-modal-btn">Add to favorite</Button>
                                    </div>
                                    <div className="description-wrapper">
                                    <ul className="movie-info list-inline">
                                    <li className="list-inline-item">Score: {movie.vote_average}</li>
                                        {
                                            (!isUndefined(rating)) ? <li className="list-inline-item">Rating: {(movie.adult) ? "R" : "PG"}</li> : ''
                                        }
                                        {
                                            (!isUndefined(movieReleaseDate)) ? 
                                                <li className="list-inline-item">Release Date: {formatDate(new Date(movieReleaseDate))}</li>
                                                : ''
                                        }
                                    </ul>
                                        {
                                            (!isNullOrUndefined(movie.overview) && movie.overview !== "") ?
                                                <p className="movie-overview">{movie.overview}</p>
                                                : ''
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Modal.Body>
                </Modal>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .modal-backdrop { 
                        background-image: url(${movie.backdrop_path});
                        background-color: transparent;
 
                        /* Add the blur effect */
                        filter: blur(20px);
                        -webkit-filter: blur(20px);
                        left: -40px;
                        right: -40px;
                        bottom: -40px;
                        top: -20px;
                      
                        /* Full height */
                        min-height: 100%; 
                      
                        /* Center and scale the image nicely */
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                     }
                `}} />
            </div>
        );
    }
}

// "connect" our movie modal to the component store
export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
        // Using lodash get, recursively check that a property is defined
        // before try to access it - if it's undefined, it will return default value
        // _.get(object, 'path.to.targets[0].neat.stuff', defaultValue)
        isOpen: _.get(state, 'movieApp.movieModal.isOpen', false),
        movieId: _.get(state, 'movieApp.movieModal.movieId'),
        movie: _.get(state, 'movieApp.movieDetails.response', {}),
        moviesList: _.get(state, 'movieApp.featuredMovies', {})
    }),
    // Map an action to a prop, ready to be dispatched
    { openMovieModal, closeMovieModal, getMovieDetails, nextMovieModal }
)(MovieModalContainer);