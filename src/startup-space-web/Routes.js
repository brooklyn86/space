import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

import NotFound from "./ui/pages/error/NotFound";
import RegisterPage from "./ui/pages/auth/register/RegisterPage";
import LoginPage from "./ui/pages/auth/login/LoginPage";
import Dashboard from "./ui/pages/dashboard/Home/Home";
import Startup from "./ui/pages/dashboard/Startup/Startup";
import CreateStartup from "./ui/pages/dashboard/Startup/Create";
import myStartup from "./ui/pages/dashboard/Startup/myStartup";

export const LOGIN_ROUTE = "/entrar";
export const INDEX_ROUTE = "/";
export const REGISTER_ROUTE = "/cadastro";
export const DASHBOARD_ROUTE = "/dashboard";
export const STARTUPVIEW_ROUTE = "/startup/:id";
export const CREATE_STARTUP_ROUTE = "/create/startup";
export const MY_STARTUP_ROUTE = "/my-startup";


export const Routes = () => (
    <Switch>
        <Route path={INDEX_ROUTE} component={() =><Redirect to={LOGIN_ROUTE}/>} exact/>
        <Route path={REGISTER_ROUTE} component={RegisterPage}/>
        <Route path={LOGIN_ROUTE} component={LoginPage}/>
        <Route path={DASHBOARD_ROUTE} component={Dashboard}/>
        <Route path={STARTUPVIEW_ROUTE} component={Startup}/>
        <Route path={CREATE_STARTUP_ROUTE} component={CreateStartup}/>
        <Route path={MY_STARTUP_ROUTE} component={myStartup}/>
        <Route component={NotFound}/>
    </Switch>
);
