import React from 'react';
import { Row, Col } from 'react-bootstrap';

class MovieApp extends React.Component {
    render() {
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
            </div>
        );
    }
}

export default MovieApp;