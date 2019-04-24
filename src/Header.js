import React from 'react';
import { Navbar, Dropdown } from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.png';
import { Link } from 'react-router-dom';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
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
                {/* <Link to='/favorites' className="dropdown-item">Favorites</Link> */}
            </Dropdown.Menu>
        </Dropdown>

    </Navbar>
);

export default Header;