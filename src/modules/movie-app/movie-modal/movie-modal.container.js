import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { openMovieModal, closeMovieModal, nextMovieModal, addToFavorites } from './movie-modal.actions';
import { getMovieDetails, getNowPlaying } from '../movie-app.actions';
import * as movieHelpers from '../movie-app.helpers';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft, faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { isUndefined, isNullOrUndefined } from 'util';
import MediaQuery from 'react-responsive';

class MovieModalContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isButtonDisabled: false
          }

        this.formatDate = this.formatDate.bind(this);
        this.goToNextMovie = this.goToNextMovie.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.checkIfFavorite = this.checkIfFavorite.bind(this);
    }

    // Triggered after property is changed
    componentWillReceiveProps(nextProps) {
        // If we will receive a new movieId
        if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
            nextProps.getMovieDetails(nextProps.movieId);
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.movieId !== prevProps.movieId) {
            this.checkIfFavorite();
        }
      }

    formatDate(date) {
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    goToNextMovie(movies) {
        const currentArrayIndex = movies.findIndex(x => x.id === this.props.movieId);
        const nextIndex = currentArrayIndex + 1;

        if (nextIndex === movies.length - 1) {
            const nextMovieId = movies[nextIndex]['id'];
            this.props.nextMovieModal(nextMovieId);
        } else if (nextIndex === movies.length) {
            const nextPage = this.props.getNowPlaying(this.props.moviesList.request.page + 1);
            this.props.nextMovieModal(null, nextPage.response);
            this.props.handlePageChangeFromModal(this.props.moviesList.request.page + 1);
        } else {
            const nextMovieId = movies[nextIndex]['id'];
            this.props.nextMovieModal(nextMovieId);
        }
    }

    addToFavorites(movie) {
        const prevFav = JSON.parse(localStorage.getItem('Favotire List')) || [];
        const currFav = [...prevFav, movie];

        localStorage.setItem('Favotire List', JSON.stringify(currFav));
        this.setState({ isButtonDisabled: true });
    }

    checkIfFavorite() {
        const currentId = this.props.movieId;
        if (!isNullOrUndefined(currentId)) {
            const favList = JSON.parse(localStorage.getItem('Favotire List'));
            const inList = favList.findIndex(x => x.id === currentId);

            inList !== -1 ? this.setState({ isButtonDisabled: true }) : this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: false });
        }
    }


    render() {
        const { isOpen, closeMovieModal, moviesList, movies } = this.props;
        const movie = movieHelpers.updateMoviePicturesUrls(this.props.movie);
        const movieReleaseDate = !isUndefined(movie.release_date) ? movie.release_date : undefined;
        const rating = !isUndefined(movie.adult) ? movie.adult : undefined;
        const renderMovies = movies && movies.length ? movies : movieHelpers.getMoviesList(moviesList.response);
        const lastPage = movieHelpers.getMoviesTotalPages(moviesList.response);

        return (
            <div>
                <Modal
                    show={isOpen}
                    size="lg"
                >
                    <Modal.Header className="px-0 px-sm-auto">
                        <MediaQuery query="(min-device-width: 993px)">
                            <Button variant="link" onClick={() => closeMovieModal()} className="modal-header-btn back">
                                <FontAwesomeIcon icon={faChevronCircleLeft} className="modal-btn-icon" /> Back to list
                        </Button>
                            {(!isNullOrUndefined(moviesList.request) && moviesList.request.page === lastPage) ? '' :
                                <Button variant="link" onClick={() => {
                                    this.goToNextMovie(renderMovies);
                                }} className="modal-header-btn next">
                                    Next Movie <FontAwesomeIcon icon={faChevronCircleRight} className="modal-btn-icon" />
                                </Button>}
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 992px)">
                            <Button variant="link" onClick={() => closeMovieModal()} className="modal-header-btn back">
                                <FontAwesomeIcon icon={faChevronLeft} className="modal-btn-icon" /> Back
                        </Button>
                            <Button variant="link" onClick={() => {
                                this.goToNextMovie(renderMovies);
                            }} className="modal-header-btn next">
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
                                                    onClick={()=> {
                                                        this.addToFavorites(movie);
                                                    }}
                                                    disabled={this.state.isButtonDisabled}
                                                >Add to favorite</Button>
                                        </div>
                                        <div className="description-wrapper">
                                            <ul className="movie-info list-inline">
                                                <li className="list-inline-item">Score: {movie.vote_average}</li>
                                                {
                                                    (!isUndefined(rating)) ? <li className="list-inline-item">Rating: {(movie.adult) ? "R" : "PG"}</li> : ''
                                                }
                                                {
                                                    (!isUndefined(movieReleaseDate)) ?
                                                        <li className="list-inline-item">Release Date: {this.formatDate(new Date(movieReleaseDate))}</li>
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
                                </MediaQuery>
                                <MediaQuery query="(max-device-width: 992px)">
                                    <Col xs={6}>
                                        <div className="title-wrapper d-flex justify-content-between">
                                            <ul className="movie-info list-unstyled mx-3">
                                                <li className="">Score: {movie.vote_average}</li>
                                                {
                                                    (!isUndefined(rating)) ? <li className="">Rating: {(movie.adult) ? "R" : "PG"}</li> : ''
                                                }
                                                {
                                                    (!isUndefined(movieReleaseDate)) ?
                                                        <li className="">Release Date: {this.formatDate(new Date(movieReleaseDate))}</li>
                                                        : ''
                                                }
                                            </ul>
                                            <Button 
                                                className="movie-modal-btn" 
                                                onClick={() => {
                                                    addToFavorites(movie);
                                                }}
                                                disabled={this.state.isButtonDisabled}
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
        movieId: _.get(state, 'movieApp.movieModal.movieId', null),
        movie: _.get(state, 'movieApp.movieDetails.response', {}),
        moviesList: _.get(state, 'movieApp.featuredMovies', {}),
    }),
    // Map an action to a prop, ready to be dispatched
    { openMovieModal, closeMovieModal, getMovieDetails, nextMovieModal, getNowPlaying, addToFavorites }
)(MovieModalContainer);