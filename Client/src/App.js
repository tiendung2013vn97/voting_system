import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeContainer from './modules/Home/container-home'
import PageNotFound from './modules/PageNotFound/PageNotFound'
import NotifyContainer from './modules/Notify/container-notify'
import PendingContainer from './modules/Pending/container-pending'
import { ProtectedLoginRoute } from './routes/ProtectedLoginRoute'
// import SignInContainer from './modules/Account/SignIn/container-signIn'
// import SignUpContainer from './modules/Account/SignUp/container-signUp'
// import TokenManage from './modules/BackgroundJobs/TokenManage'
import './App.css'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App" >
          <NotifyContainer />
          <PendingContainer/>
          {/* <TokenManage /> */}
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            {/* <Route exact path='/sign-in' component={SignInContainer} /> */}
            {/* <Route exact path='/sign-up' component={SignUpContainer} /> */}
            {/* <Route exact path='/votes' component={SignUpContainer} /> */}
            <Route path='*' component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;