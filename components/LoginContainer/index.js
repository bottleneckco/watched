import React, { Component } from 'react';

import Login from '../Login';
import Content from '../Content';
import styles from './styles.scss';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };

    this.onSignIn = (googleUser) => {
      if(!this.state.isLogin) {

        this.setState({isLogin: true});

        console.log('User signed in.')
      }
    }

    this.onSignOut = (e) => {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {

        this.setState({isLogin: false});

        console.log('User signed out.');
      });
    }
  }

  render() {
    if(this.state.isLogin)
      return <Content onSignOut={this.onSignOut} />
    else
      return <Login onSignIn={this.onSignIn} />
  }
}

export default LoginContainer;
