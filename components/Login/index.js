import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

import styles from './styles.scss';

class Login extends Component {
  render() {
    return (
      <div>
        <div className="loginBtn">
          <GoogleLogin
            className="g-signin2"
            clientId={process.env.GOOGLE_CLIENT_ID}
            onSuccess={(googleUser) => {this.props.onSignIn(googleUser);}}
            tag="div"
            scope="https://www.googleapis.com/auth/drive.appfolder"
          />
        </div>
      </div>
    );
  }
}

export default Login;
