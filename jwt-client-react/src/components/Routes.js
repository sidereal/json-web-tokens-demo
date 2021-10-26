import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Homepage";

import Header from "./header/Header";

import GenericTest from "./test/GenericTest";
import { refreshTest, tokenBasedSecurityTest, roleBasedSecurityTest, errorTest } from './test/testPageParameters'

import { ErrorHandler } from "./Error";




const Routes = () => {

    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/refreshdemo" component={() => <GenericTest title='refresh demo' params={refreshTest} />} />
                <Route exact path="/errordemo" component={() => <GenericTest title='error demo' params={errorTest} />} />
                <Route exact path="/tokendemo" component={() => <GenericTest title='token demo' params={tokenBasedSecurityTest} />} />
                <Route exact path="/roledemo" component={() => <GenericTest title='role demo' params={roleBasedSecurityTest} />} />
                {/* <Route exact path="/security" component={() => <SecurityTest title='security test' />} /> */}
                <Route exact path="/error" component={ErrorHandler} />
                <Route render={() => <h1>404: page not found</h1>} />
            </Switch>
        </Router>
    )
}

export default Routes

