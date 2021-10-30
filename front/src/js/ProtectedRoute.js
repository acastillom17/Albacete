import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "./redux/modules/cuenta/login";
import { VerifyLogin } from "./common/components/layout";

import WidgetUserWelcome from "./common/components/layout/Sidebar/WidgetUserWelcome";
import WidgetEarningSidebar from "./common/components/layout/Sidebar/WidgetEarningSidebar";
import MenuSidebar from "./common/components/layout/Sidebar/MenuSidebar";
import FooterCopyright from "./common/components/layout/Sidebar/FooterCopyright";
import HeaderMobile from "./common/components/layout/Header/HeaderMobile";

class PrivateRouteBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleOpen: true
        };
    }

    navToggle = () => {
        this.setState({ toggleOpen: !this.state.toggleOpen });
    };

    isAuthenticated = () => {
        const token = localStorage.getItem("token");
        const {
            getMe,
            login: { me }
        } = this.props;
        if (!!token && !!me.username) {
            return true;
        } else if (token) {
            getMe();
            return "Verifying";
        }
        return false;
    };

    render() {
        const {
            component: Component,
            logOut,
            login: { me },
            ...rest
        } = this.props;
        const isAuthenticated = this.isAuthenticated();
        return (
            <Route
                {...rest}
                render={(props) =>
                    isAuthenticated ? (
                        isAuthenticated === true ? (
                            <div className="martfury-admin">
                                <main className="ps-main">
                                    <div className="ps-main__sidebar">
                                        <div className="ps-sidebar">
                                            <div className="ps-sidebar__top">
                                                <WidgetUserWelcome />
                                                <WidgetEarningSidebar />
                                            </div>
                                            <div className="ps-sidebar__content">
                                                <div className="ps-sidebar__center">
                                                    <MenuSidebar />
                                                </div>
                                            </div>
                                            <div className="ps-sidebar__footer">
                                                <FooterCopyright />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ps-main__wrapper">
                                        <HeaderMobile />
                                        <Component {...props} />
                                    </div>
                                </main>
                            </div>
                        ) : (
                            <VerifyLogin />
                        )
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        );
    }
}

const mstp = (state) => ({ ...state });

const mdtp = {
    ...actions,
};

const ProtectedRoute = withRouter(connect(mstp, mdtp)(PrivateRouteBase));

export default ProtectedRoute;
