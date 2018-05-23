import React from 'react';
import {Link} from 'react-router-dom';
import Login from '../login';


const Navbar = () => {
    return (
        <nav className="navbar navbar-default navbar-inverse">
            <ul className="nav navbar-nav">
                <li>
                    <Link to="/login">
                        Login Page
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        Register Page
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Home Page
                    </Link>
                </li>

                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">Categories
                        <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/categories">
                                List All
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories/add">
                                Add new
                            </Link>
                        </li>
                    </ul>
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
                        Otpis Inventurne Stavke
                    </Link>
                </li>
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">Stavke
                        <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/dodajstavku">
                                Dodaj novu stavku
                            </Link>
                        </li>
                        <li>
                            <Link to="/modifikujstavku">
                                Modifikuj stavku
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/novaInventura">
                        Inventura
                    </Link>
                </li>
                <li>
                    <Link to="/help">
                        <img height="25px" src="https://unpkg.com/@icon/font-awesome/icons/question-circle.svg"
                             alt="help"/>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;