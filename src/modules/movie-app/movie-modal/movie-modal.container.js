import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { closeMovieModal } from './movie-modal.actions';
import { getMovieDetails } from '../movie-app.actions';
import * as movieHelpers from '../movie-app.helpers';
import { Modal } from 'react-bootstrap';

class MovieModalContainer extends React.Component {
    // Triggered after property is changed
    componentWillReceiveProps(nextProps) {
        // If we will receive a new movieId
        if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
            nextProps.getMovieDetails(nextProps.movieId);
        }
    }

    render() {
        const { isOpen, closeMovieModal } = this.props;
        const movie = movieHelpers.updateMoviePicturesUrls(this.props.movie);
        const genres = (movie && movie.genres) ? movie.genres.map(genre => genre.name).join(', ') : '';

        console.log(movie);

        return (
            <div>
                <Modal
                    show={isOpen}
                    onHide={closeMovieModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Modal heading
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <h1>{movie.title}</h1>
                            <h5>{genres}</h5>
                            <p>{movie.overview}</p>
                            <p>Popularity: {movie.popularity}</p>
                            <p>Budget: ${movie.budget}</p>
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
                        background-size: calc(100% + 40px);
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
    }),
    // Map an action to a prop, ready to be dispatched
    { closeMovieModal, getMovieDetails }
)(MovieModalContainer);