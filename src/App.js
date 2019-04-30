import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TopNav from './Components/layout/TopNav'
import Homepage from './Components/homepage/Homepage'
import ProjectDetails from './Components/projects/ProjectDetails'
import SignIn from './Components/auth/SignIn'
import SignUp from './Components/auth/SignUp'
import CreateProject from './Components/projects/CreateProject'
import UserProfile from './Components/users/UserProfile'
import UserList from './Components/users/UserList'
import ProjectList from './Components/projects/ProjectList'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <TopNav />
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/projects' component={ProjectList} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/profile/:id' component={UserProfile} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/users' component={UserList} />
            <Route path='/create' component={CreateProject} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
