import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from "../Notify/action-notify";
import config from "../../config";
import { logout } from "../Account/action-account";


class TokenManage extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.getNewAccessToken = this.getNewAccessToken.bind(this);
  }

  componentDidMount() {
    this.getNewAccessToken();
  }
  //render
  render() {
    return <div style={{ display: "none" }}></div>;
  }

  getNewAccessToken() {
    let fn=()=>{
      console.log('aaa')
      const api = axios.create({ baseURL: config.URL });
      api
        .get("auth/token/get-new-access-token",  {
          withCredentials: true
        })
        .then(res => {
          if (res.data.status === "fail") {
            switch (res.data.msg) {
              case config.REQUEST_IS_INVALID: {
                // this.props.showFailNotify("Request is invalid!");
                console.log("GetNewTokenErr: Request is invalid!");
                break;
              }
              case config.NO_TOKEN: {
                this.props.logout();
                break;
              }
              case config.USERNAME_IS_NOT_EXIST: {
                console.log("GetNewTokenErr: Username is not existed");
                break;
              }
              case config.ACCOUNT_IS_DEACTIVATED: {
                this.props.showAlertNotify(
                  "GetNewTokenErr: This account is deactivated"
                );
                break;
              }
              case config.TOKEN_IS_INVALID: {
                console.log("GetNewTokenErr: Access token is invalid");
                break;
              }
              default: {
                console.log(res.data.msg);
                break;
              }
            }
            return;
          }
          setTimeout(fn, 3600000);
        })
        .catch(err => {
          console.log("GetNewTokenErr: " + err);
          setTimeout(fn, 5 * 60 * 1000);
        });
    }
   fn();
  }
}

//map state to props
function mapStateToProps(state) {
  return {};
}

//map dispatch to props
function mapDispatchToProps(dispatch) {
  return {
    logout() {
      return dispatch(logout());
    },

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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenManage);
