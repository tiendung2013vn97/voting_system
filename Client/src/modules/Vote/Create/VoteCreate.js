import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./VoteCreate.scss"
import { Grid, Button, TextField, Select, MenuItem, Card } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

class VoteCreate extends Component {

  //constructor
  constructor(props) {
    super(props);
    this.state = {
      options: [{ id: 1, text: "" }]
    }
  }

  //render
  render() {

    let optionHtml = []
    const createOption = (optionId, text) => {
      return <TextField required={true} className="option-item" id={"option-" + optionId} label={"Option " + optionId} defaultValue={text} />
    }

    this.state.options.forEach(option => {
      optionHtml.push(
        createOption(option.id, option.text)
      )
    })


    return (
      <div>
        <form className="create-vote-form" noValidate autoComplete="off">
          <div className="form-container">
            <TextField required={true} className="form-item" id="c-topic" label="Topic" />
            <br />
            <TextField
              required={true}
              id="from-date"
              label="From Date"
              type="datetime-local"
              className="form-item"
              // defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <TextField
              required={true}
              id="to-date"
              label="To Date"
              type="datetime-local"
              className="form-item"
              // defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <TextField required={true} className="form-item" id="c-content" label="Content" multiline={true} />
            <br />

            <div><b>Options:</b></div>
            {optionHtml}
            <div style={{ "marginTop": "20px" }}>
              <Button variant="outlined" onClick={this.addOption.bind(this)} ><AddIcon /></Button>
              {this.state.options.length > 1 && <Button variant="outlined" onClick={this.removeOption.bind(this)}  ><RemoveIcon /></Button>}
            </div>

          </div>


          {/* <TextField required={true} className="form-item" id="c-name" label="Name" />
          <br />
          <TextField required={true} className="form-item" id="c-age" label="Age" type="number" />
          <br /> */}


          <div className="btn-container">
            <Button id="btn-close" style={{ marginTop: 20, float: "left" }} variant="contained" color="secondary" onClick={this.close.bind(this)}>Close</Button>
            <Button id="btn-create" style={{ marginTop: 20, float: "right" }} variant="contained" color="primary" onClick={this.createVote.bind(this)} >Create</Button>
          </div>

        </form>
      </div >
    );

  }

  createVote() {
    let topic = document.getElementById("c-topic")
    let fromDate = document.getElementById("from-date");
    let toDate = document.getElementById("from-date");
    let content = document.getElementById("c-content")
    let options = []
    this.state.options.forEach(op => {
      let optionAtId = document.getElementById("option-" + op.id)
      options.push({ id: op.id, text: optionAtId.value })
    })


    this.setState({ ...this.state, options: [{ id: 1, text: "" }] })
  }

  close() {
    this.props.handleCloseCreateModal()
    this.setState({ ...this.state, options: [{ id: 1, text: "" }] })
  }

  addOption() {
    let options = this.state.options
    options.push({ id: options.length + 1, text: "" })
    this.setState({ ...this.state, options: [...options] })
  }

  removeOption() {
    let options = this.state.options
    options.pop()
    this.setState({ ...this.state, options: [...options] })
  }


}

export default VoteCreate;