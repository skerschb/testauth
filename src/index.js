import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Stitch, GoogleRedirectCredential } from "mongodb-stitch-browser-sdk";

class User extends React.Component {

  constructor(props) {
    console.log("call constructor");
    super(props);
  }

  componentDidUpdate() {
    console.log("Formatted component updated");
  }


  render() {
    console.log("render");
    if (this.props.value===undefined) return null;
    return <div className="formatted">
            <div className="subheading">User Data:</div>
            Name:
            <pre className="pre">{this.props.value.data.name}</pre>
            </div>
  }
}
class Demo extends React.Component {

  constructor(props) {
    console.log("call constructor");
    super(props);
    this.state = { 
      user: [],
    }
  }

  componentDidMount() {
    this.setupStitch();
    console.log("component Did mount running");
  }

  setupStitch() {
    console.log("setup stitch latest");
    const appName = 'authentication_test-htbrq';
    const stitchClient = Stitch.hasAppClient(appName) ? Stitch.defaultAppClient : Stitch.initializeDefaultAppClient(appName);
    
    if (stitchClient.auth.hasRedirectResult()) {
        stitchClient.auth.handleRedirectResult().then(user => {
        console.log(user);
    })}

    if (!stitchClient.auth.isLoggedIn) {
      const credential = new GoogleRedirectCredential();
      Stitch.defaultAppClient.auth.loginWithRedirect(credential);
    } else {
       console.log("stitch client logged in");
       console.log(stitchClient.auth.user.profile);
       var userState = [];
       userState[0] = stitchClient.auth.user.profile;
       console.log(userState);
       this.setState({
          user: userState,
       });
    }
  }

  getUser() {
    if (this.state.user === []) {
      console.log("User is null");
      return {};
    }
    console.log("user is not null");
    return this.state.user;
  }

  componentDidUpdate() {
    console.log("component updated");
  }

  render() {
    if (this.state.user[0] === undefined) {
      return null;
    }
    return (
      <User value={this.state.user[0]}/>
    )
  }
}

// ========================================
   
ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);