import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Navbar, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import logo from '../../logo.png';
import * as movieActions from './movie-app.actions';
import * as movieHelpers from './movie-app.helpers';
import MovieList from './movie-list/movie-list.component';
import MediaQuery from 'react-responsive';
import Pagination from "react-js-pagination";
import MovieModal from './movie-modal/movie-modal.container';
import MovieFavorites from './movie-favorites/movie-favorites.component';

class MovieApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.props.getNowPlaying(this.state.activePage);
    }


    handlePageChange(pageNumber) {
        this.props.getNowPlaying(pageNumber);
        this.setState({ activePage: pageNumber });
    }

    render() {
        const { featuredMovies } = this.props;
        const movies = movieHelpers.getMoviesList(featuredMovies.response);
        const totalResults = movieHelpers.getMoviesTotalResults(featuredMovies.response);

        return (
            <div>
                <Navbar bg="dark" variant="dark" className="d-flex justify-content-between align-items-center w-100 movie-navbar">

                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="50"
                            height="50"
                            className="d-inline-block brand-img"
                        />
                        <p className="brand-title d-inline-block">Movies</p>
                    </Navbar.Brand>

                    <Dropdown>
                        <Dropdown.Toggle id="account-dropdown" className="movie-btn">

                            <MediaQuery query="(min-device-width: 993px)">
                                <span>My Account </span>
                            </MediaQuery>

                            <FontAwesomeIcon icon={faChevronDown} className="account-icon" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/favorites">Favorites</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Navbar>
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
                        <MovieList movies={movies} />
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
        featuredMovies: state.movieApp.featuredMovies
    }),
    // Map action creators to properties of our component
    { ...movieActions }
)(MovieApp);