import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../Login/Login.scss';

class PasswordRecoveryConfirm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    render() {
        const { onSubmit, loader } = this.props;
        
        return (
        <div className="container">

        <div className="pl-80 ml-80 pr-80 mr-80" style={{display:"flex",justifyContent:"center"}}>
            <div className="container pt-50 pb-80">
                <div className="ps-form--account">
                    <div className="navigation ps-tab-list mb-0 pb-0 pt-20">
                            <img src="" className="justify-content-center"/>
                    </div>
                    <div className="ps-tab active pb-25 mb-25" id="register">
                        <div className="ps-form__content">
                            <div>
                                <h1>
                                    ¡Se realizó la solicitud de recuperación!
                                </h1>
                                <p>
                                    Hemos recibido tu solicitud de recuperación de la cuenta
                                    y te hemos enviado un correo electronico con las instrucciones
                                    para realizar la recuperación de la cuenta. Si el correo no se 
                                    encuentra en tu bandeja principal siempre puedes comprobar en la
                                    bandeja de "correos no deseados".
                                </p>
                                <Link to="/login">
                                    <a className="ps-btn ps-btn--fullwidth" style={{color:"black"}}>
                                        Iniciar sesión
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        );
    }
}

export default PasswordRecoveryConfirm;
