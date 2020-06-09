import {Switch, Route, Redirect} from 'react-router-dom';
import React from "react";
import NotFound from "./ui/pages/error/NotFound";
import RegisterPage from "./ui/pages/auth/register/RegisterPage";
import LoginPage from "./ui/pages/auth/login/LoginPage";

export const LOGIN_ROUTE = "/entrar";
export const INDEX_ROUTE = "/";
export const REGISTER_ROUTE = "/cadastro";

export const Routes = () => (
    <Switch>
        <Route path={INDEX_ROUTE} component={() =><Redirect to={LOGIN_ROUTE}/>} exact/>
        <Route path={REGISTER_ROUTE} component={RegisterPage}/>
        <Route path={LOGIN_ROUTE} component={LoginPage}/>
        <Route component={NotFound}/>
    </Switch>
);
