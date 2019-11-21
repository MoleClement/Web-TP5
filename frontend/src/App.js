import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Movie from './Movie'

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className={"App"}>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to="/movielist"/>
                    )}/>
                    <Route exact path='/movielist' component={Movie}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
