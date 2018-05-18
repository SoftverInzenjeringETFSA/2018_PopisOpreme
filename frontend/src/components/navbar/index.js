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
                    <li>
                        <Link to="/generisanjenaljepnica">
                            Generisanje Naljepnica
                        </Link>
                    </li>
                    <li>
                        <Link to="/otpisinventurnestavke">
                            Brisanje Inventurne Stavke
                        </Link>
                    </li>
                    <li>
                        <Link to="/dodajstavku">
                            Dodavanje Inventurne Stavke
                        </Link>
                    </li>
                    <li>
                        <Link to="/novaInventura">
                            Nova inventura
                        </Link>
                    </li>
                    <li>
                        <Link to="/inventura">
                            Inventura
                        </Link>
                    </li>
                </ul>
        </nav>
    );
};

export default Navbar;