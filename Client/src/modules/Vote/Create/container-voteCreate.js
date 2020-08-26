import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import { showAlertNotify, showSuccessNotify, showFailNotify } from '../../Notify/action-notify'
import VoteCreate from './VoteCreate'


class VoteCreateContainer extends Component {

    //constructor
    constructor(props) {
        super(props);
    }

    //render
    render() {

        return (
           <VoteCreate
           handleCreateVote={this.props.handleCreateVote}
           handleCloseCreateModal={this.props.handleCloseCreateModal}
           showAlertNotify={this.props.showAlertNotify}
           />
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
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VoteCreateContainer);