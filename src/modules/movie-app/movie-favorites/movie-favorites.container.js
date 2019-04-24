import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { openMovieModal, closeMovieModal} from '../movie-modal/movie-modal.actions';
import MovieFavoritesComponent from './movie-favorites.component';
import MovieModal from '../movie-modal/movie-modal.container';
class MovieFavorites extends React.Component {
    state = {
        favoriteList: [],
        modalState: false,
    };

    componentDidMount() {
        const favoriteList = JSON.parse(localStorage.getItem('Favotire List'));
        this.setState({favoriteList});
    };

    removeFromFavorites = (movie) => {
        const favList = JSON.parse(localStorage.getItem('Favotire List'));
        const filteredItems = favList.filter(x => x.id !== movie.id);
        localStorage.setItem('Favotire List', JSON.stringify(filteredItems));
        this.setState({
            favoriteList: filteredItems
        })
    }

    render() {
        const movieColumns = this.state.favoriteList ? this.state.favoriteList.map(movie => (
            <MovieFavoritesComponent key={movie.id} movie={movie} removeFromFavorites={this.removeFromFavorites} />
        )) : null;
        
        return (
            <div id="favoritesContent">
                <div className="container-fluid fav-page-heading">
                    <Row>
                        <Col>
                            <div className="text-left">
                                <h5 className="grid-title">My favorite</h5>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="container-fluid">
                {
                    movieColumns.length !== 0 ? movieColumns : 
                        <div className="text-left favorite-movie">
                            <h5 className="grid-title">No favorites yet</h5>
                        </div>
                }
                </div>
                <MovieModal movies={this.state.favoriteList} />
            </div>
        );
    }
}

// "connect" our movie favorites to the component store
export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
            // Using lodash get, recursively check that a property is defined
            // before try to access it - if it's undefined, it will return default value
            // _.get(object, 'path.to.targets[0].neat.stuff', defaultValue)
            movieId: _.get(state, 'movieApp.movieModal.movieId'),
            movie: _.get(state, 'movieApp.movieDetails.response', {}),
            moviesList: _.get(state, 'movieApp.featuredMovies', {}),
        }),
    // Map an action to a prop, ready to be dispatched
    { openMovieModal, closeMovieModal }
)(MovieFavorites);