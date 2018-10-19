  import React from 'react';
  import ReactDOM from 'react-dom';

  import { Stitch, GoogleRedirectCredential } from "mongodb-stitch-browser-sdk";

  //display google auth user information
  class User extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      if (this.props.value === undefined) return null;
      
      return <div>
              <pre>{this.props.value.data.name}</pre>
              </div>
    }
  }

  class Demo extends React.Component {

    constructor(props) {
      super(props);
      this.state = { 
        user: [],
      }
    }

    componentDidMount() {
      this.setupStitch();
    }

    setupStitch() {
      //copy the name of your google-auth enabled stitch application here
      //the name of the app will typically be the stitch application name
      //with a "-"" + random string appended
      const appName = 'authentication_test-htbrq';

      //need a description of how this works as the API method names are a
      //little unclear
      const stitchClient = Stitch.hasAppClient(appName) ? Stitch.defaultAppClient : Stitch.initializeDefaultAppClient(appName);
      
      //check if this user has already authenticated and we're
      //here from the redirect. If so, process the redirect.
      if (stitchClient.auth.hasRedirectResult()) {
          stitchClient.auth.handleRedirectResult().then(user => {
          console.log("processed redirect result");
      })}

      //manage user authentication state
      if (!stitchClient.auth.isLoggedIn) {
        const credential = new GoogleRedirectCredential();
        Stitch.defaultAppClient.auth.loginWithRedirect(credential);
      } else {
        //the stitch client marks this user as logged in, add the user
        //profile to state so we can view their name on the page
        var userState = [];
        userState[0] = stitchClient.auth.user.profile;
        this.setState({
          user: userState,
        });
      }
    }

    getUser() {
      if (this.state.user === []) {
        return {};
      }
      return this.state.user;
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
