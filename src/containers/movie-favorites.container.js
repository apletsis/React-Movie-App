import React from 'react';
import { Row, Col } from 'react-bootstrap';

class MovieFavorites extends React.Component {
    render() {
        return(
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
            </div>
        );
    }
}

export default MovieFavorites;