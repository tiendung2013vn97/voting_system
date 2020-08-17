import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import { showAlertNotify, showSuccessNotify, showFailNotify } from '../../Notify/action-notify'
import SignUp from './SignUp'
import config from '../../../config'

class SignUpContainer extends Component {

    //constructor
    constructor(props) {
        super(props);
        this.signUp=this.signUp.bind(this);
    }

    //render
    render() {
        return (
            <div className="sign-up-container">
                <div className="sign-up-background"></div>
                <SignUp signUp={this.signUp}/>
            </div>
        );
    }
    signUp(userInformation) {
        const api = axios.create({ baseURL: config.URL });
        api.post('auth/account/user/signUp', userInformation,{withCredentials: true}).then(res => {
            console.log(res);
            if(res.data.status==='fail'){
                switch(res.data.msg){
                    case config.NAME_ATTRIBUTE_INVALID:{
                        this.props.showFailNotify("Exist field is named invalidly!"); 
                        break;
                    }
                    case config.USERNAME_IS_EXISTED:{
                        this.props.showFailNotify("Username is existed! Please choose other username!"); 
                        break;
                    }
                    case config.EMAIL_IS_EXISTED:{
                        this.props.showFailNotify("Email is existed! Please choose other email!"); 
                        break;
                    }
                    case config.REQUEST_IS_INVALID:{
                        this.props.showFailNotify("Request is invalid! Please check that you have entered enough information"); 
                        break;
                    }
                    default:{
                        this.props.showFailNotify(res.data.msg); 
                        break;
                    }
                }
                return;
            }
            this.props.showSuccessNotify('Sign up successfully! Please confirm this account via email before login!');      

        }).catch(err => {
            this.props.showAlertNotify(''+err);
        })
    }
    
}

//map state to props
function mapStateToProps(state) {
    return {

    };

}

//map dispatch to props
function mapDispatchToProps(dispatch) {
    return {

        //show alert dialog
        showAlertNotify(msg) {
            return dispatch(showAlertNotify(msg));
        },

        //show fail dialog
        showFailNotify(msg) {
            return dispatch(showFailNotify(msg));
        },

        //show alert dialog
        showSuccessNotify(msg) {
            return dispatch(showSuccessNotify(msg));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);