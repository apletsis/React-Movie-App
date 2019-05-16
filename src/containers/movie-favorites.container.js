import React from 'react';
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'react-bootstrap';
import MovieFavoritesComponent from '../components/movie-favorites.component';
import MovieModal from './movie-modal.container';
@inject("MovieAppStore")
@observer
class MovieFavorites extends React.Component {

    render() {
        const { favoriteMovies, removeFromFavorites } = this.props.MovieAppStore;

        const movieColumns = favoriteMovies ? favoriteMovies.map(movie => (
            <MovieFavoritesComponent key={movie.id} movie={movie} removeFromFavorites={removeFromFavorites} />
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
                        movieColumns && movieColumns.length !== 0 ? movieColumns :
                            <div className="text-left favorite-movie">
                                <h5 className="grid-title">No favorites yet</h5>
                            </div>
                    }
                </div>
                <MovieModal favMovies={favoriteMovies} className="favorites-modal" />
            </div>
        );
    }
}

export default MovieFavorites;