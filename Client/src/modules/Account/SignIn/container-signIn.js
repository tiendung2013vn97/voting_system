import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import config from "../../../config";
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from "../../Notify/action-notify";
import SignIn from "./SignIn";
import { updateAccountInfo } from "../action-account";

class SignInContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  //render
  render() {
    return (
      <div className="sign-in-container">
        <div className="sign-in-background"></div>
        <SignIn login={this.login} />
      </div>
    );
  }

  login(userInformation) {
    const api = axios.create({ baseURL: config.URL });
    api
      .post("auth/account/user/login", userInformation, {
        withCredentials: true
      })
      .then(res => {
        console.log(res);
        if (res.data.status === "fail") {
          switch (res.data.msg) {
            case config.MAX_NUMBER_LOGIN: {
              this.props.showFailNotify(
                "Number of this account's login is excessive! You must log out other device before or LOG OUT ALL DEVICE"
              );
              break;
            }
            case config.REQUEST_IS_INVALID: {
              this.props.showFailNotify(
                "Request is invalid! Please check that you have entered  username and password "
              );
              break;
            }
            case config.USERNAME_IS_NOT_EXIST: {
              this.props.showFailNotify(
                "Username isn't exist! Please check again"
              );
              break;
            }
            case config.PASSWORD_IS_WRONG: {
              this.props.showFailNotify(
                "Password isn't wrong! Please check again"
              );
              break;
            }
            case config.ACCOUNT_IS_DEACTIVATED: {
              this.props.showFailNotify(
                "This account is deactivated! Contact admin for more information "
              );
              break;
            }
            default: {
              this.props.showFailNotify(res.data.msg);
              break;
            }
          }
          return;
        }

        let user = res.data.buffer;
        this.props.storeAccountInfo(user);
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("user", JSON.stringify(user));

        if (this.props.location.state) {
          this.props.history.push(this.props.location.state.from.pathname);
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        this.props.showAlertNotify("" + err);
      });
  }
}

//map state to props
function mapStateToProps(state) {
  return {};
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

    storeAccountInfo(info) {
      return dispatch(updateAccountInfo(info));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
