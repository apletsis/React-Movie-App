import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as movieActions from '../actions/movie-app.actions';
import * as movieHelpers from '../utils/movie-app.helpers';
import MovieList from '../components/movie-list.component';
import Pagination from "react-js-pagination";
import MovieModal from './movie-modal.container';
import Loader from '../components/loader.component';

class MovieApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    componentDidMount() {
        this.props.getNowPlaying(this.state.activePage);
    }

    handlePageChange = (pageNumber) => {
        this.props.getNowPlaying(pageNumber);
        this.setState({ activePage: pageNumber });
    }

    render() {
        const { featuredMovies, isLoading } = this.props;
        console.log(isLoading);
        const movies = movieHelpers.getMoviesList(featuredMovies.response);
        const totalResults = movieHelpers.getMoviesTotalResults(featuredMovies.response);

        return (
            <div>
                <div id="mainContent">

                    <div className="container-fluid">
                        <Row>
                            <Col>
                                <div className="text-left">
                                    <h5 className="grid-title">Latest Releases</h5>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="container-fluid">
                    <Loader isLoading={isLoading}>
                        <MovieList movies={movies} />
                    </Loader>
                    </div>
                    <div className="container-fluid my-5">
                        <Row>
                            <Col>
                                <Pagination
                                    hideDisabled
                                    prevPageText='Prev'
                                    nextPageText='Next'
                                    firstPageText='First'
                                    lastPageText='Last'
                                    linkClass='page-link'
                                    linkClassFirst='rounded-left'
                                    linkClassLast='rounded-right'
                                    itemClassFirst='first-page'
                                    itemClassLast='last-page'
                                    innerClass='pagination justify-content-center'
                                    activeLinkClass='active-page'
                                    activePage={this.state.activePage}
                                    totalItemsCount={totalResults}
                                    itemsCountPerPage={20}
                                    pageRangeDisplayed={3}
                                    onChange={this.handlePageChange}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
                <MovieModal />
            </div>
        );
    }
}

export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
        featuredMovies: state.movieApp.featuredMovies,
        isLoading: state.movieApp.featuredMovies.isLoading,
    }),
    // Map action creators to properties of our component
    { ...movieActions }
)(MovieApp);