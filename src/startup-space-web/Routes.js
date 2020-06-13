import {Switch, Route, Redirect} from 'react-router-dom';
import React from "react";
import NotFound from "./ui/pages/error/NotFound";
import RegisterPage from "./ui/pages/auth/register/RegisterPage";
import LoginPage from "./ui/pages/auth/login/LoginPage";
import Dashboard from "./ui/pages/dashboard/Home/Home";

export const LOGIN_ROUTE = "/entrar";
export const INDEX_ROUTE = "/";
export const REGISTER_ROUTE = "/cadastro";
export const DASHBOARD_ROUTE = "/dashboard";


export const Routes = () => (
    <Switch>
        <Route path={INDEX_ROUTE} component={() =><Redirect to={LOGIN_ROUTE}/>} exact/>
        <Route path={REGISTER_ROUTE} component={RegisterPage}/>
        <Route path={LOGIN_ROUTE} component={LoginPage}/>
        <Route path={DASHBOARD_ROUTE} component={Dashboard}/>
        <Route component={NotFound}/>
    </Switch>
);
