import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieFavoritesComponent from '../components/movie-favorites.component';
import MovieModal from './movie-modal.container';
class MovieFavorites extends React.Component {
    state = {
        favoriteList: []
    };

    componentDidMount() {
        const favoriteList = JSON.parse(localStorage.getItem('Favotire List'));
        this.setState({favoriteList});
    }

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
                    movieColumns && movieColumns.length !== 0 ? movieColumns : 
                        <div className="text-left favorite-movie">
                            <h5 className="grid-title">No favorites yet</h5>
                        </div>
                }
                </div>
                <MovieModal favMovies={this.state.favoriteList} className="favorites-modal" />
            </div>
        );
    }
}

export default MovieFavorites;