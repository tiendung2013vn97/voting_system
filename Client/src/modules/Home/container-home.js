import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import Home from './Home'
import config from "../../config";
import {
    showAlertNotify,
    showSuccessNotify,
    showFailNotify
} from "../Notify/action-notify";
import { updateUser,pending } from "./action-home";

class HomeContainer extends Component {

    //constructor
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    //render
    render() {

        return (
            <Home
                login={this.login} home={this.props.home}/>
        );
    }

    login(userLogin) {
        this.props.pending(true)
        const api = axios.create({ baseURL: config.URL });
        api
            .post("api/user/login", userLogin, {
                withCredentials: true
            })
            .then(res => {
                console.log(res);
                if (res.data.status === "fail") {
                    switch (res.data.code) {
                        default: {
                            this.props.showFailNotify(res.data.msg);
                            break;
                        }
                    }
                    return;
                }

                let user = res.data.result;
                this.props.updateUser(user);
                localStorage.setItem("isLogged", "true");
                localStorage.setItem("user", JSON.stringify(user));
                this.props.pending(false)
                this.props.history.push("/");
                // if (this.props.location.state) {
                //     this.props.history.push(this.props.location.state.from.pathname);
                // } else {
                //     this.props.history.push("/");
                // }
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
        home:state.home
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

        updateUser(user) {
            return dispatch(updateUser(user));
        },

        pending(state){
            return dispatch(pending(state));
        }
    };

};

// export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);