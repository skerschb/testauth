import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Stitch, GoogleRedirectCredential, RemoteMongoClient } from "mongodb-stitch-browser-sdk";


class Demo extends React.Component {

  constructor(props) {
    console.log("call constructor");
    super(props);
    this.state = {email: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setupStitch();
  }

  handleChange(event) {
     this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    console.log("handle submit");
    this.setState({validate: true});
  }

  componentDidMount() {
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
       console.log(stitchClient.auth.user);
       this.setState({
          "user": stitchClient.auth.user, 
       });
    }

  }


  componentDidUpdate() {
    console.log("Parameters component updated");
  }

  set(value) {
    this.setState({"hello":"duh"});
    console.log(this.state);
  }

  render() {

    return (
      <div className="user">
         <pre>{this.state.user}</pre>
      </div>
    )
  }
}

// ========================================
   
ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);