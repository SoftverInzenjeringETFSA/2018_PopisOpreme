import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-default navbar-inverse">
                <ul className="nav navbar-nav">
                    <li>
                        <Link to="/">
                            Login Page
                        </Link>
                    </li>
                    <li>
                        <Link to="/home">
                            Home Page
                        </Link>
                    </li>
                    <li>
                        <Link to="/unosProstorije">
                            Unos prostorije
                        </Link>
                    </li>
                    <li>
                        <Link to="/brisanjeProstorije">
                            Brisanje prostorije
                        </Link>
                    </li>
                </ul>
        </nav>
    );
};

export default Navbar;