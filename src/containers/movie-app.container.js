import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { observer, inject } from 'mobx-react'
import MovieListComponent from "../components/movie-list.component";
import Pagination from "react-js-pagination";
import Loader from '../components/loader.component';

@inject("MovieAppStore")
@observer
class MovieApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            totalMovies: 0
        };
    }

    async componentDidMount () {
        const { MovieAppStore } = this.props;
        const responseCallback = await MovieAppStore.getNowPlaying(this.state.activePage);
        MovieAppStore.getNowPlaying(this.state.activePage);
        this.setState({ totalMovies: responseCallback });
    }

    handlePageChange = async (pageNumber) => {
        const { MovieAppStore } = this.props;
        await MovieAppStore.clearMoviesList();
        await MovieAppStore.getNowPlaying(pageNumber);
        this.setState({ activePage: pageNumber });
    }

    render() {
        const { movies, isLoading } = this.props.MovieAppStore;

        return(
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
                        <MovieListComponent  movies={ movies }/>
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
                                    totalItemsCount={this.state.totalMovies}
                                    itemsCountPerPage={20}
                                    pageRangeDisplayed={3}
                                    onChange={this.handlePageChange}
                                />
                            </Col>
                        </Row>
                    </div>
            </div>
        );
    }
}

export default MovieApp;