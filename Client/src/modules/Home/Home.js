import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button, TextField } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import InfoIcon from '@material-ui/icons/Info';
import InstagramIcon from '@material-ui/icons/Instagram';
import { yellow } from '@material-ui/core/colors';
import "./Home.scss"
import VoteChain from "../../assets/imgs/votechain.png"
import Carousel from 'react-material-ui-carousel'
import Slide1 from "../../assets/imgs/slide1.jpg"
import Slide2 from "../../assets/imgs/slide2.jpg"
import Slide3 from "../../assets/imgs/slide3.jpg"
import ReactModal from "react-modal"

const loginStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

class Home extends Component {

  //constructor
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleLogin=this.handleLogin.bind(this)
  }


  handleOpenModal() {
    this.setState({ ...this.state,showModal: true });
  }

  handleCloseModal() {
    this.setState({ ...this.state,showModal: false });
  }

  handleLogin(){
    let userId=document.getElementById("userid").value
    let privateKey=document.getElementById("private-key").value
    this.props.login({userId,privateKey})
    this.setState({ ...this.state,showModal: false });
  }

  //render
  render() {
    var items = [
      Slide1, Slide2, Slide3
    ]
    return (
      <div id="home">
        <Grid container style={{ fontSize: "25px", marginTop: 20 }}>
          <Grid item xs={4}>
            {/* <img src={VoteChain} alt="no image" style={{width:180,height:40}}/> */}
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={4}>
                <InfoIcon />
                <a href="#" className="about ref">About us</a>

              </Grid>
              <Grid item xs={4}>
                <FacebookIcon color="primary" />
                <a href="#" className="facebook ref">Facebook</a>

              </Grid>
              <Grid item xs={4}>
                <InstagramIcon color="secondary" />
                <a href="#" className="instagram ref">Instagram</a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} >
            <Button style={{ float: "right" }} variant="contained" color="primary" onClick={this.handleOpenModal}>
              Login
            </Button>
          </Grid>
        </Grid>

        <Grid container style={{ fontSize: "18px", marginTop: 50, textAlign: "left", paddingLeft: 100 }}>
          <Grid item xs={3}>
            <h1 style={{ fontStyle: "italic" }}>
              Voting Network
            </h1>
            <br />
            <div>
              The network helps you <b>vote</b>.
              <br />
              <b>Trustworthy </b>and <b>public</b> with everyone!
            </div>

            <Button variant="contained" color="primary" className="create-account-btn">
              Create a FREE account !
            </Button>
          </Grid>
          <Grid item xs={7} >
            <Carousel >
              {
                items.map((item, i) => <img style={{ width: "100%", height: 460, borderRadius: "5px" }} src={item} />)
              }
            </Carousel>
          </Grid>
        </Grid>


        <ReactModal
          isOpen={this.state.showModal}
          style={loginStyles}
        >
          <form className="login-form" noValidate autoComplete="off">
            <TextField required={true} className="form-item" id="userid" label="User ID" />
            <br />
            <TextField required={true} className="form-item" id="private-key" label="Private key" />
            <br />
            <div>
              <Button style={{ marginTop: 20, float: "left" }} variant="contained" color="secondary" onClick={this.handleCloseModal}>Close</Button>
              <Button style={{ marginTop: 20, float: "right" }} variant="contained" color="primary" onClick={this.handleLogin} >Login</Button>
            </div>

          </form>



        </ReactModal>


      </div>
    );

  }

}

export default Home;