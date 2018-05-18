import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../login';
import Home from '../home';
import Navbar from '../navbar';
import NotFound from '../404';
import {UnosProstorije, BrisanjeProstorije} from '../prostorija';
import GenerisanjeNaljepnica from '../generisanje_naljepnica';
import OtpisInventurneStavke from '../otpis_stavke';


const EntryRouter = () => {
    return (
        <Router>
            <div>
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/unosProstorije' component={UnosProstorije}/>
                    <Route exact path='/brisanjeProstorije' component={BrisanjeProstorije}/>
                    <Route exact path='/generisanjenaljepnica' component ={GenerisanjeNaljepnica} />
                    <Route exact path='/otpisinventurnestavke' component ={OtpisInventurneStavke} />
                    <Route path='*' component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
};

export default EntryRouter;