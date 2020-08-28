import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeContainer from './modules/Home/container-home'
import PageNotFound from './modules/PageNotFound/PageNotFound'
import NotifyContainer from './modules/Notify/container-notify'
import PendingContainer from './modules/Pending/container-pending'
import { ProtectedLoginRoute } from './routes/ProtectedLoginRoute'
import VoteListContainer from './modules/Vote/ViewList/container-voteList' 
import NavBar from './modules/NavBar/NavBar'
import VoteDetailContainer from './modules/Vote/ViewDetail/container-voteDetail'
import './App.css'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App" >
          <NotifyContainer />
          <PendingContainer/>
          <NavBar />
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <ProtectedLoginRoute exact path="/votes" component={VoteListContainer}/>
            <ProtectedLoginRoute path="/votes/:id" component={VoteDetailContainer}/>
            {/* <ProtectedLoginRoute exact path="/votes/:id"/> */}
            <Route path='*' component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;