import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft, faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { isNullOrUndefined } from 'util';
import MediaQuery from 'react-responsive';
import Loader from '../components/loader.component';
import { observer, inject } from 'mobx-react';

@inject("MovieAppStore")
@observer
class MovieModalContainer extends React.Component {

    render() {
        const { 
            isOpen, isLoading, closeMovieModal, 
            movies, formatDate, isButtonDisabled, 
            goToNextMovie, addToFavorites 
        } = this.props.MovieAppStore;
        const movie = this.props.MovieAppStore.updateMoviePicturesUrls(this.props.MovieAppStore.movie);
        const renderMovies = this.props.favMovies && this.props.favMovies ? this.props.favMovies : movies;
        const buttonVisibility = renderMovies.length <= 1 ? true : false;
        
        return (
            <div>
                 
                <Modal
                    show={isOpen}
                    size="lg"
                >
                <Loader isLoading={isLoading}>
                    <Modal.Header className="px-0 px-sm-auto">
                        <MediaQuery query="(min-device-width: 993px)">
                            <Button variant="link" onClick={() => closeMovieModal()} className="modal-header-btn back">
                                <FontAwesomeIcon icon={faChevronCircleLeft} className="modal-btn-icon" /> Back to list
                            </Button>
                            <Button 
                                variant="link" 
                                onClick={() => goToNextMovie(renderMovies) }
                                className={`modal-header-btn next ${buttonVisibility ? 'hidden' : ''}`}
                            >
                                Next Movie <FontAwesomeIcon icon={faChevronCircleRight} className="modal-btn-icon" />
                            </Button>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 992px)">
                            <Button variant="link" onClick={() => closeMovieModal()} className="modal-header-btn back">
                                <FontAwesomeIcon icon={faChevronLeft} className="modal-btn-icon" /> Back
                        </Button>
                            <Button 
                                variant="link"
                                onClick={() => goToNextMovie(renderMovies) }
                                className={`modal-header-btn next ${buttonVisibility ? 'hidden' : ''}`}
                            >
                                Next <FontAwesomeIcon icon={faChevronRight} className="modal-btn-icon" />
                            </Button>
                        </MediaQuery>
                    </Modal.Header>
                   
                    <Modal.Body className="px-0 px-sm-auto">
                        <div className="container-fluid h-100 d-flex align-items-center">
                            <Row className="no-gutters mx-auto w-100">
                                <Col xs={6} sm={6} md={6} lg={4}>
                                    <img src={movie.poster_path} className="img-fluid" alt='movie poster' />
                                </Col>
                                <MediaQuery query="(min-device-width: 993px)">
                                    <Col xs={6} sm={6} md={6} lg={8}>
                                        <div className="title-wrapper d-flex justify-content-between">
                                            <h2 className="align-self-end">{movie.title}</h2>
                                                <Button 
                                                    className="movie-modal-btn" 
                                                    onClick={ () => addToFavorites(movie) }
                                                    disabled={isButtonDisabled}
                                                >Add to favorite</Button>
                                        </div>
                                        <div className="description-wrapper">
                                            <ul className="movie-info list-inline">
                                                <li className="list-inline-item">Score: {movie.vote_average}</li>
                                                <li className="list-inline-item">Rating: {(movie.adult) ? "R" : "PG"}</li>
                                                <li className="list-inline-item">Release Date: {formatDate(new Date(movie.release_date))}</li>
                                            </ul>
                                            {
                                                (!isNullOrUndefined(movie.overview) && movie.overview !== "") ?
                                                    <p className="movie-overview">{movie.overview}</p>
                                                    : ''
                                            }
                                        </div>
                                    </Col>
                                </MediaQuery>
                                <MediaQuery query="(max-device-width: 992px)">
                                    <Col xs={6}>
                                        <div className="title-wrapper d-flex justify-content-between">
                                            <ul className="movie-info list-unstyled mx-3">
                                                <li className="">Score: {movie.vote_average}</li>
                                                <li className="list-inline-item">Rating: {(movie.adult) ? "R" : "PG"}</li>
                                                <li className="list-inline-item">Release Date: {formatDate(new Date(movie.release_date))}</li>
                                            </ul>
                                            <Button 
                                                className="movie-modal-btn" 
                                                onClick={() => addToFavorites(movie) }
                                                disabled={isButtonDisabled}
                                            ><FontAwesomeIcon icon={faStar} /></Button>
                                        </div>
                                    </Col>
                                    <Col xs={12} className="mt-5">
                                        <h2 className="align-self-end">{movie.title}</h2>
                                        {
                                            (!isNullOrUndefined(movie.overview) && movie.overview !== "") ?
                                                <p className="movie-overview">{movie.overview}</p>
                                                : ''
                                        }
                                    </Col>
                                </MediaQuery>
                            </Row>
                        </div>
                    </Modal.Body>
                    </Loader>
                </Modal>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .modal-backdrop { 
                            background-image: url(${movie.backdrop_path});
                         }
                    `}} />
            </div>
        );
    }
}

export default MovieModalContainer;