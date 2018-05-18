import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../login';
import Home from '../home';
import Navbar from '../navbar';
import NotFound from '../404';
import {UnosProstorije, BrisanjeProstorije} from '../prostorija';
<<<<<<< HEAD
import GenerisanjeNaljepnica from '../generisanje_naljepnica';
import OtpisInventurneStavke from '../otpis_stavke';

=======
import NovaInventura from '../novaInventura';
import Inventura from '../inventura';
import PregledKorisnika from '../pregledKorisnika';

import Category from '../categories';
>>>>>>> e6c48cfbcc55122886ee79ef42afacb937577ac5

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
<<<<<<< HEAD
                    <Route exact path='/generisanjenaljepnica' component ={GenerisanjeNaljepnica} />
                    <Route exact path='/otpisinventurnestavke' component ={OtpisInventurneStavke} />
=======
                    <Route exact path='/novaInventura' component={NovaInventura}/>
                    <Route exact path='/inventura' component={Inventura}/>
                    <Route exact path='/categories' component={Category}/>
                    <Route exact path='/pregledKorisnika' component={PregledKorisnika} />
>>>>>>> e6c48cfbcc55122886ee79ef42afacb937577ac5
                    <Route path='*' component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
};

export default EntryRouter;