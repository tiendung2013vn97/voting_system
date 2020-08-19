import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'


class Home extends Component {

  //constructor
  constructor(props) {
    super(props);
  }

  //render
  render() {

    return (
      <div>
        <Grid container>
          <Grid item xs={4}>
            VoteChain
         </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={4}>
                <a href="https://google.com.vn">
                  About us
                </a>
              </Grid>
              <Grid item xs={4}>
                Facebook
              </Grid>
              <Grid item xs={4}>
                Instagram
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary">
              Primary
    </Button>
          </Grid>
        </Grid>
      </div>
    );

  }

}

export default Home;