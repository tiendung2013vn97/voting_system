import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import { showAlertNotify, showSuccessNotify, showFailNotify } from '../../Notify/action-notify'
import VoteList from './VoteList'
import config from "../../../config";
import { updateVotes } from '../action-vote'

class VoteListContainer extends Component {

    //constructor
    constructor(props) {
        super(props);


    }

    //render
    render() {

        return (
            <VoteList 
                votes={this.props.votes}
                createVote={this.createVote.bind(this)}
            />
        );
    }

    getVotes() {
        const api = axios.create({ baseURL: config.URL });
        api
            .get("api/votes")
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

                this.props.updateVotes(res.data.result)
            })
            .catch(err => {
                this.props.pending(false)
                this.props.showAlertNotify("An error has happened when login:\n" + err);
            });
    }


    createVote(vote){
        console.log("vote",vote)

    }


}

//map state to props
function mapStateToProps(state) {
    return {
        votes: state.vote.votes
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

        updateVotes(votes) {
            return dispatch(updateVotes(votes))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VoteListContainer);