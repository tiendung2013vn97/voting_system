import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showAlertNotify, showSuccessNotify, showFailNotify } from '../../Notify/action-notify'
import {updateAccountInfo} from '../action-account'


class SignInContainer extends Component {   

    componentDidMount(){
        let user=localStorage.getItem('user');
        if(user){
            this.props.updateAccountInfo(JSON.parse(user));
        }
    }

    //render
    render() {

        return (
           <div></div>
        );
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
        },

        updateAccountInfo(info){
            return dispatch(updateAccountInfo(info));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);