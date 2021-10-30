import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';
import './Login.scss';
import LoadMask from "Utils/LoadMask/LoadMask";

class Login extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    render() {
        const { onSubmit, loader } = this.props;
        if (localStorage.getItem('token')) {
            return (<Redirect to="/" />);
        }
        return (
            <div className="register-photo">

            <div className="form-container">
                <div className="image-holder" id="image-login"></div>
                    <LoadMask loading={loader} light>
                        <LoginForm onSubmit={onSubmit} />
                    </LoadMask>
            </div>
        </div>
        
        );
    }
}

export default Login;
