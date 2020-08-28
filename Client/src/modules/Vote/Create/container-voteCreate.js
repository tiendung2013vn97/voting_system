import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import { showAlertNotify, showSuccessNotify, showFailNotify } from '../../Notify/action-notify'
import VoteCreate from './VoteCreate'
import config from "../../../config";
import { pending } from '../../Home/action-home'


class VoteCreateContainer extends Component {

    //constructor
    constructor(props) {
        super(props);
    }

    //render
    render() {

        return (
            <VoteCreate
                handleCreateVote={this.createVote.bind(this)}
                handleCloseCreateModal={this.props.handleCloseCreateModal}
                showAlertNotify={this.props.showAlertNotify}
            />
        );
    }


    createVote(vote) {
        this.props.pending(true)
        const api = axios.create({ baseURL: config.URL });
        api
            .post("api/votes", vote)
            .then(res => {
                console.log(res);
                if (res.data.status === "fail") {
                    switch (res.data.code) {
                        default: {
                            this.props.showFailNotify(res.data.msg);
                            break;
                        }
                    }
                    this.props.pending(false)
                    return;
                }

                this.props.handleCloseCreateModal()
                this.props.showSuccessNotify("Created vote successfully!")
                this.props.pending(false)
            })
            .catch(err => {
                this.props.pending(false)
                this.props.showAlertNotify("An error has happened when login:\n" + err);
            });
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

        pending(state) {
            return dispatch(pending(state));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VoteCreateContainer);