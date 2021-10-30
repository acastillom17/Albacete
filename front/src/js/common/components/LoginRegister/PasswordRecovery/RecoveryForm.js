import React, { Component } from 'react';
import LoadMask from "../../Utils/LoadMask/LoadMask";
import { actions } from '../../../../redux/modules/cuenta/login';
import { Form, Input } from 'antd';
import { connect } from 'react-redux';


class RecoveryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
        };
    }

    componentDidMount(){
        this.handleLoader()

    }


    handleLoader = () => {
        setTimeout(()=> this.setState({loader:false}),1000);
    }


    handleLoginSubmit = e => {
        this.props.password_recovery(e);
    };



    render() {
        return (
        <div className="register-photo">
            {this.loader === true ?
            <div className="ps-tab-list">
            <LoadMask loading={this.state.loader} dark>
            
            </LoadMask>
            </div>
            :
            null
            }
            <div className="form-container">
                <div className="image-holder"></div>
                <Form
                    onFinish={this.handleLoginSubmit.bind(this)}>
                        <div className="ps-form--account" id="password-recovery">
                            <div>
                                <h1>Recupera tu cuenta</h1>
                                <p>Para poder recuperar tu cuenta necesitamos que proporciones los siguientes datos:</p>
                                <div className="form-group mt-3">
                                    <Form.Item
                                        name="usuario"
                                        rules={[
                                            {
                                            required: true,
                                            message:'Por favor ingresa este campo!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Usuario"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Recuperar
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                            </div>
                        </div>
                    </Form>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return state.login;
};

const md2p = {...actions};


export default connect(mapStateToProps, md2p)(RecoveryForm);
