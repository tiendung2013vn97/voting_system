import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Paper, Card, CardContent, Divider, Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from '@material-ui/icons/Visibility';
import "./VoteList.scss"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid } from '@material-ui/core';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReactModal from "react-modal"
import CreateVoteContainer from "../Create/container-voteCreate"

const createVoteStyles = {
  content: {
    top: '300px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

class VoteList extends Component {

  //constructor
  constructor(props) {
    super(props);

    this.state = {
      openCreateVote: false
    }

    this.handleCloseCreateModal=this.handleCloseCreateModal.bind(this)
    this.handleCreateVote=this.handleCreateVote.bind(this)
  }

  //render
  render() {

    let createVotePanel = []
    createVotePanel.push(
      <Grid item xs={4} className="card-create-vote-container" >
        <Card className="card-vote" style={{ width: "90%" }} onClick={this.openCreateVote.bind(this)}>
          <CardContent>

            <div className="create-vote-text">Create new vote</div>
            <AddSharpIcon className="plus-icon" />

          </CardContent>

        </Card>
      </Grid>
    )

    let votePanel = []
    votePanel.push(
      <Grid item xs={4} className="card-vote-container" >
        <Card className="card-vote" style={{ width: "90%" }}>
          <CardContent className="card-content">
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={3} className="small-account-container">
                    <AccountCircleIcon style={{ fontSize: 50, color: "green" }} />
                  </Grid>
                  <Grid item xs={9}>
                    <span className="label"> Topic:</span>
                    <span className="label-text"> Bầu tổng thống</span>
                    <div className="min-date"> From: 12/09/2020</div>
                    <div className="min-date"> To: 12/10/2020</div>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 10 }} className="content">
                  Mong thế giới ngày càng bình yên hơn nữa, chúng tôi ủng hộ  Mong thế giới ngày càng bình yên hơn nữa, chúng tôi ủng hộ Mong thế giới ngày càng bình yên hơn nữa, chúng tôi ủng hộ Mong thế giới ngày càng bình yên hơn nữa, chúng tôi ủng hộ Mong thế giới ngày càng bình yên hơn nữa, chúng tôi ủng hộ Mong thế giới ngày càng bình yên hơn nữa, chúng tôi ủng hộ Mong thế giới ngày càng bình yên hơn nữa, chúng tôi ủng hộ Mong thế giới ngày càng bình yên hơn nữa, chúng tôi ủng hộ asdasdasdasdasd
                </Grid>

              </Grid>
            </Grid>
          </CardContent>
          <div className="view-detail">
            <VisibilityIcon className="eye-icon" />
            View Detail</div>
        </Card>
      </Grid>
    )

    let votePanels = []
    votePanels.push(createVotePanel)
    votePanels.push(votePanel)
    votePanels.push(votePanel)
    votePanels.push(votePanel)
    votePanels.push(votePanel)
    votePanels.push(votePanel)
    votePanels.push(votePanel)
    votePanels.push(votePanel)
    votePanels.push(votePanel)
    votePanels.push(votePanel)
    return (
      <div>
        <Paper id="search-box" >

          <InputBase
            placeholder="Search your votes..."
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>

          <Button id="btn-refresh">
            <RefreshIcon />
          </Button>


        </Paper>

        <Grid container id="votes-container">
          {votePanels}
        </Grid>

        <ReactModal
          isOpen={this.state.openCreateVote}
          style={createVoteStyles}
        >
          <CreateVoteContainer
            handleCreateVote={this.handleCreateVote}
            handleCloseCreateModal={this.handleCloseCreateModal}
          />

        </ReactModal>

      </div>
    );

  }

  openCreateVote() {
    this.setState({ ...this.state, openCreateVote: true })
  }

  handleCloseCreateModal() {
    this.setState({ ...this.state, openCreateVote: false })
  }

  handleCreateVote(vote) {
    this.props.createVote(vote)
    this.setState({ ...this.state, openCreateVote: false })
  }

}

export default VoteList;