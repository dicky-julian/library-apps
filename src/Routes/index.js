import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Provide Components
import Home from '../Pages/Home';
import Book from '../Pages/Book';
import Database from '../Pages/Database';
import Error404 from '../Pages/Error/404';

const Router = () => {
    return (
        <div className="wrapper">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/book/:id" component={Book} />
                <Route exact path="/database" component={Database} />
                <Route path="*" component={Error404} />
            </Switch>
        </div>
    )
}

export default Router;