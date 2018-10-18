import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Stitch, GoogleRedirectCredential, RemoteMongoClient } from "mongodb-stitch-browser-sdk";


class Demo extends React.Component {

  constructor(props) {
    console.log("call constructor");
    super(props);
    this.setupStitch();
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
       console.log(stitchClient.auth.user.profile);
       this.setState({
          "user": stitchClient.auth.user.profile, 
       });
    }
    console.log(this.state);

  }

  componentDidUpdate() {
    console.log("component updated");
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