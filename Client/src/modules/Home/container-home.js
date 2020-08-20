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
import { updateUser, pending } from "./action-home";

class HomeContainer extends Component {

    //constructor
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.createAccount=this.createAccount.bind(this)
        this.child = React.createRef()
    }

    //render
    render() {

        return (
            <Home
                login={this.login}
                home={this.props.home}
                createAccount={this.createAccount}
                ref={this.child} />
        );
    }

    login(userLogin) {
        this.props.pending(true)
        const api = axios.create({ baseURL: config.URL });
        api
            .post("api/user/login", userLogin)
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
                this.child.current.clearFormLogin()
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


    createAccount(userCreate) {
        this.props.pending(true)
        const api = axios.create({ baseURL: config.URL });
        api
            .post("api/user", userCreate)
            .then(res => {
                console.log(res);
                if (res.data.status === "fail") {
                    switch (res.data.code) {
                        case "USERID_EXIST": {
                            this.props.showFailNotify("User ID existed! Please choose another User ID!");
                            return
                        }
                        default: {
                            this.props.showFailNotify(res.data.msg);                            
                            break;
                        }
                    }
                    return;
                }

                let user = res.data.result;

                this.props.showSuccessNotify("Create account successfully!\n Please keep your private-key below for later login: ")
                this.child.current.handleCloseCreateAccountModal()
                this.props.pending(false)
                this.child.current.clearFormCreateAccount()

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
        home: state.home
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

        pending(state) {
            return dispatch(pending(state));
        }
    };

};

// export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);