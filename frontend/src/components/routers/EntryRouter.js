import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../login';
import Home from '../home';
import Navbar from '../navbar';
import NotFound from '../404';
import {UnosProstorije, BrisanjeProstorije} from '../prostorija';
import NovaInventura from '../novaInventura';
import Inventura from '../inventura';

import Category from '../categories';
import AddCategory from '../categories/category';

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
                    <Route exact path='/novaInventura' component={NovaInventura}/>
                    <Route exact path='/inventura' component={Inventura}/>
                    <Route exact path='/categories' component={Category}/>
                    <Route exact path='/categories/add' component={AddCategory}/>
                    <Route path='*' component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
};

export default EntryRouter;