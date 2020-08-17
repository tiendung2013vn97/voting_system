import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"



class HomeContainer extends Component {

    //constructor
    constructor(props) {
        super(props);
    }

    //render
    render() {

        return (
           <div>

           </div>
        );
    }

    
}

//map state to props
function mapStateToProps(state) {
    return {

    };

}

//map dispatch to props
function mapDispatchToProps(dispatch) {
    return {

      
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);