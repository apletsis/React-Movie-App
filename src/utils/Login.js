import React from 'react';
import fakeAuth from './fakeAuth';
import { Redirect } from "react-router-dom";

class Login extends React.Component {
    state = { redirectToReferrer: false };
  
    login = () => {
      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true });
      });
    };
  
    render() {
      let { from } = this.props.location.state || { from: { pathname: "/" } };
      let { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) return <Redirect to={from} />;
  
      return (
        <div id="loginPage">
          <h5 className="grid-title">You must log in to view this page</h5>
          <button onClick={this.login} className="unfav-btn btn btn-primary">Log in</button>
        </div>
      );
    }
}

export default Login;