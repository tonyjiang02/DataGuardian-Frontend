import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, createContext } from 'react';
const App = () => {
    return (
        // <AuthContext.Provider value={profile}>
        <GoogleOAuthProvider clientId="175259980186-s2hdb3lghv70um12ujfds9uiscm4dgqk.apps.googleusercontent.com">
            <BrowserRouter>
                <Switch>
                    <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                    <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                    <Redirect from="/" to="/admin/index" />
                </Switch>
            </BrowserRouter>

        </GoogleOAuthProvider>
        // </AuthContext.Provider>
    );
};
export default App;