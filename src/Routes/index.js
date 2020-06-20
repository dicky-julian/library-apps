import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Provide Components
import Home from '../Pages/Home'
// import Error404 from '../Pages/Error/404';

const Router = () => {
    return (
        <div className="wrapper">
            <Switch>
                <Route exact path="/" component={Home} />
                {/* <Route path="*" component={Error404} /> */}
            </Switch>
        </div>
    )
}

export default Router;