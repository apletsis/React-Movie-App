import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from './movie-card.component';
import LoaderComponent from './loader.component';

const styles = {
    movieColumn: {
        marginBottom: 20
    }
}

const MovieListComponent = ({ movies, isLoading }) => {
    const movieColumns = movies ? movies.map(movie => (
        <Col style={styles.movieColumn} key={movie.id} xs={6} sm={12} md={4} lg={2}>
            <MovieCard movie={movie} />
        </Col>
    )) : null;

    return (
        <Row>
            {movieColumns}
            <LoaderComponent isLoading={isLoading} />
        </Row>
    );
}

export default MovieListComponent;