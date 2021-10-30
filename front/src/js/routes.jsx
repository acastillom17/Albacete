import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { Login } from "./common/components/LoginRegister";
import Home from "./common/components/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./common/components/layout/NotFound/NotFound";
import "../assets/fonts/fonts.css";
import "../assets/public/css/bootstrap.min.css";
import "../assets/public/css/slick.min.css";
import "../style/scss/style.scss";
import "../assets/public/fonts/Linearicons/Font/demo-files/demo.css";
import "../assets/public/fonts/font-awesome/css/font-awesome.css";
import "./Layout.scss";

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
