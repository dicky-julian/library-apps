import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Provide Components
import Home from '../Pages/Home';
import Book from '../Pages/Book';
import Error404 from '../Pages/Error/404';

const Router = () => {
    return (
        <div className="wrapper">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/:id" component={Book} />
                <Route path="*" component={Error404} />
            </Switch>
        </div>
    )
}

export default Router;