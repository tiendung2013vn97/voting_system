import React, { Component } from "react";
import "./SignIn.scss";
import { Link } from "react-router-dom";
import Background from "../../../assets/imgs/loginBackground3.jpg";

class SignIn extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //render
  render() {
    return (
      <div id="sign-in-page">
        <div className="form-box">
            <section className="left-box">
                <span>Wellcome To English Class</span>
                <h5>By: OV BIS</h5>
            </section>
            <section className="right-box">
                <span>Sign in</span>
                <div>
                  <input id="username_val" type="text" placeholder="Name"/>

                  <input id="password_val" type="password" placeholder="Password"/>
                  <div id="forget-password-link">
                    <Link to={"/forget-password"}>Forgot password </Link>
                  </div>
                  <button onClick={this.handleLogin}>Sign in</button>
                </div>

                <div id="sign-up-link">
                  <Link to={"/sign-up"}>Sign up</Link>
                </div>
            </section>
        </div>
      </div>
    );
  }

  /** handleLogin
    handle user click button send
  */
  handleLogin() {
    let username = document.getElementById("username_val").value;
    let password = document.getElementById("password_val").value;

    let userInformation = {
      username: username,
      password: password
    };
    this.props.login(userInformation);
  }
}

export default SignIn;
