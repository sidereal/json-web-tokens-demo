import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Homepage";

import Header from "./header/Header";

import GenericTest from "./test/GenericTest";
import { cookieTest, securityTest, errorTest } from './test/testPageParameters'

import { ErrorHandler } from "./Error";

import { Test } from "./test/Test";


const Routes = () => {
    
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/test1" component={() => <Test title='this is test one' />} />
                <Route exact path="/test2" component={() => <Test title='this is test two' />} />
                <Route exact path="/cookietest" component={() => <GenericTest title='cookie test' params={cookieTest} />} />
                <Route exact path="/errortest" component={() => <GenericTest title='error test' params={errorTest} />} />
                <Route exact path="/securitytest" component={() => <GenericTest title='security test' params={securityTest} />} />
                {/* <Route exact path="/security" component={() => <SecurityTest title='security test' />} /> */}
                <Route exact path="/error" component={ErrorHandler} />
                <Route render={() => <h1>404: page not found</h1>} />
            </Switch>
        </Router>
    )
}

export default Routes

