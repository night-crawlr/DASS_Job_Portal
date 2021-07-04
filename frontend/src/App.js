
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from "./components/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Profile as applProfile } from "./components/applicant/Profile";
import Search from "./components/applicant/Search";
import { Profile as recrProfile } from "./components/recruiter/Profile";
import { JobCreation as jobCreation } from "./components/recruiter/JobCreation";
import { MyJobs } from "./components/recruiter/MyJobs";
import { ShowDesiredApplications } from "./components/recruiter/ShowDesiredApplications.js"
import MyApplications from "./components/applicant/MyApplications"
import MyEmployees from "./components/recruiter/MyEmployees"
export class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path="/reg" component={Register} exact />
          <Route path="/auth" component={Login} exact />
          <Route path="/appl/prf" component={applProfile} exact />
          <Route path="/appl/srch" component={Search} exact />
          <Route path="/appl/myapl" component={MyApplications} exact />
          <Route path="/recr/prf" component={recrProfile} exact />
          <Route path="/recr/job/create" component={jobCreation} exact />
          <Route path="/recr/myjbs" component={MyJobs} exact />
          <Route path="/recr/myjbs/applications" component={ShowDesiredApplications} exact></Route>
          <Route path="/recr/myepls" component={MyEmployees} exact></Route>

        </Switch>
      </div>
    )
  }
}

export default App;
