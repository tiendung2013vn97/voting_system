import React, { Component } from "react";
import { Link } from "react-router-dom";
import Background from "../../../assets/imgs/loginBackground3.jpg";
import './SignUp.scss'

class SignUp extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.handleSignUp=this.handleSignUp.bind(this);
  }

  //render
  render() {
    return (
      <div id="sign_up_page">
        <div className="form-box">
            <section className="left-box">
                <span>Wellcome To English Class</span>
                <h5>By: OV BIS</h5>
            </section>
            <section className="right-box">
                <span>Sign up</span>
                <form>
                  <input id="fullname_val" type="text" placeholder="Full name"/>
                  <input id="username_val" type="text" placeholder="Username"/>
                  <input id="password_val" type="password" placeholder="Password"/>
                  <input id="email_val" type="email" placeholder="abc@tma.com.vn"/>

                  <button onClick={this.handleSignUp}>Sign up</button>
                </form>

                <div id="sign-in-link">
                  <Link to={"/sign-in"}>Sign in</Link>
                </div>
            </section>
        </div>
      </div>
    );
  }
  
  /** handleSignUp
    handle user click button sign up
  */
 handleSignUp() {
    let username = document.getElementById("username_val").value;
    let password = document.getElementById("password_val").value;
    let email = document.getElementById("email_val").value;
    let fullname = document.getElementById("fullname_val").value;


    let userInformation = {
      username: username,
      password: password,
      email:email,
      fullname:fullname

    };
    this.props.signUp(userInformation);
    //let btnSignUp=document.getElementsByClassName('btn-signup')[0];
  }
}


export default SignUp;
