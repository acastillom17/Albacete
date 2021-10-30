import React, { Component } from 'react';
import {api} from '../../../../../utility/api'
import { connect} from "react-redux";
import {actions} from '../../../../../redux/modules/cuenta/login'
import LoadMask from "../../../Utils/LoadMask/LoadMask";
import RecoverPasswordForm from './RecoverPasswordForm'
import {sucessVerify, submitChangePassword} from '../../../../../redux/modules/cuenta/profile'


class FormChange extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
          token : this.props.match.params.id,
          valid: null,
          loader: true,
      }
    }

    componentDidMount(){
        this.verify_token(this.state.token);
        setTimeout(()=> this.setState({loader:false}),3000);
    }


    
    verify_token = async(token) =>{
        const reponse = api.get(`recovery/verifying/?token=${token}`).then((reponse) =>{
            this.setState({valid:reponse})
        })
    .catch((error) => {
        if(error){
            this.setState({valid:error.body})
        }
        });
    }

    handleSend = (data) =>{
        data['token'] = this.state.token
        this.props.submitChangePassword(data);
    }


render() {
    const valido = this.state.valid
    return (            
        <div className="container pt-50 mt-50">
            {this.state.loader?
                <LoadMask loading={this.state.loader} dark>
                </LoadMask>
                :
                <RecoverPasswordForm 
                is_valid={valido}
                onSubmit={this.handleSend}
                />
                
            }
        </div>
    );
}
}

const ms2p = state => {
    return state;
};


const md2p = {...actions , sucessVerify, submitChangePassword}

  
export default connect(ms2p ,md2p)(FormChange);