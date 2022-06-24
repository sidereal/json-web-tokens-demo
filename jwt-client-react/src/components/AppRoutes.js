import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { refreshTest, tokenBasedSecurityTest, roleBasedSecurityTest, errorTest } from '../reference/testPageParameters'

import HomePage from "./Homepage";
import Header from "./header/Header";
import GenericTest from "./GenericTest";
import { ErrorHandler } from "./Error";

const AppRoutes = () => {

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/refreshdemo" element={<GenericTest title='refresh demo' params={refreshTest} />} />
                <Route path="/errordemo" element={<GenericTest title='error demo' params={errorTest} />} />
                <Route path="/tokendemo" element={<GenericTest title='token demo' params={tokenBasedSecurityTest} />} />
                <Route path="/roledemo" element={<GenericTest title='role demo' params={roleBasedSecurityTest} />} />
                <Route path="/error" element={<ErrorHandler />} />
                <Route path="*" element={<h1>404: page not found</h1>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes

//<Route path="home" element={<HomePage />} />