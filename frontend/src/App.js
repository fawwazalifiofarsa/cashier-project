import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Login from './views/auth/Login';
import Register from './views/auth/Register';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import 'react-responsive-modal/styles.css';


import Auth from "./layouts/Auth.jsx";
import Admin from "./layouts/Admin.jsx";

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn : false,
      redirectToReferrer:false
    }
  }
  render(){

    if (this.state.redirectToReferrer) {
        return (<Redirect to={'/auth'}/>)
    }
    return (
      <Router>
        <Switch> 
          <Route path="/auth" component={Auth} />
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router> 

    );
  }
}

