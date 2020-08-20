import './PageNotFound.scss'
import React, { Component } from 'react'
import BackgroundHome from '../../assets/imgs/bg1.jpg'

class PageNotFound extends Component{

    render(){
        return (
            <div id='page-not-found'>
                <div>ERROR:404 Page Not Found</div> 
            <img src={BackgroundHome} alt=""/>
            </div>
        )
    }
}

export default PageNotFound;