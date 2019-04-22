import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';

class MovieFavorites extends React.Component {
    render() {
        const { favoriteList } = this.props;
        console.log(this.props);
        return (
            <div id="favoritesContent">
                <div className="container-fluid">
                    <Row>
                        <Col>
                            <div className="text-left">
                                <h5 className="grid-title">My favorite</h5>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="container-fluid">
                    {favoriteList ? favoriteList.map(favMovie => (
                        <Col xs={6} sm={12} md={4} lg={2}>
                            <h2>{favMovie.title}</h2>
                        </Col>
                    )) : null}
                </div>
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
        favoriteList: _.get(state, 'movieApp.MovieFavorites.favoriteList', []),
    }),
    // Map an action to a prop, ready to be dispatched
    {}
)(MovieFavorites);