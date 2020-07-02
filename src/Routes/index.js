import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useToken } from '../Utils/Api/index';

// Provide Components
import Home from '../Pages/Home';
import Book from '../Pages/Book';
import Database from '../Pages/Database';
import MyBook from '../Pages/MyBook';
import Search from '../Pages/Search';
import Error404 from '../Pages/Error/404';

const Router = () => {
    const data = useToken();
    return (
        <div className="wrapper">
            { data ?
                data.role === "admin" ?
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/book" component={Search} />
                    <Route exact path="/book/:id" component={Book} />
                    <Route exact path="/database" component={Database} />
                    <Route path="*" component={Error404} />
                </Switch>
                :
                <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/book" component={Search} />
                <Route exact path="/book/:id" component={Book} />
                <Route exact path="/mybook" component={MyBook} />
                <Route path="*" component={Error404} />
            </Switch>
            :
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/book" component={Search} />
                <Route exact path="/book/:id" component={Book} />
                <Route path="*" component={Error404} />
            </Switch>
            }
        </div>
    )
}

export default Router;