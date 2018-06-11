import React, { Component } from 'react';

import Login from '../Login';
import Content from '../Content';
import styles from './styles.scss';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };

    this.onSignIn = () => {
      if (!this.state.isLogin) {
        this.setState({ isLogin: true });
        console.log('User signed in.');
      }
    };

    this.onSignOut = () => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        this.setState({ isLogin: false });
        console.log('User signed out.');
      });
    };
  }

  render() {
    return this.state.isLogin ? (
      <Content onSignOut={this.onSignOut} />
    ) : (
      <Login onSignIn={this.onSignIn} />
    );
  }
}

export default LoginContainer;
