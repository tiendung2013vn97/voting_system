import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Pending.scss'


class PendingContainer extends Component {

  //render
  render() {
    let display=this.props.home.pending?"block":"none"
    return (
      <div className='pending-container' style={{display}}>
        <div className="loader"></div>
      </div>

    );
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

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PendingContainer)