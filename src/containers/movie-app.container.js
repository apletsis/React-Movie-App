import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { observer, inject } from 'mobx-react'
import MovieListComponent from "../components/movie-list.component";
import Pagination from "react-js-pagination";
import Loader from '../components/loader.component';
import MovieModal from '../containers/movie-modal.container';

@inject("MovieAppStore")
@observer
class MovieApp extends React.Component {

    async componentDidMount () {
        const { getNowPlaying, activePage } = this.props.MovieAppStore;
        await getNowPlaying(activePage);
    }

    render() {
        const { movies, isLoading, handlePageChange, activePage, totalMovies } = this.props.MovieAppStore;

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
                     <Loader isLoading={ isLoading }>
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
                                    activePage={ activePage }
                                    totalItemsCount={ totalMovies }
                                    itemsCountPerPage={ 20 }
                                    pageRangeDisplayed={ 3 }
                                    onChange={ handlePageChange }
                                />
                            </Col>
                        </Row>
                    </div>
                    <MovieModal />
            </div>
        );
    }
}

export default MovieApp;