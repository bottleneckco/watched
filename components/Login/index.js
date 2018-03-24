import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

import styles from './styles.scss';

class Login extends Component {
  render() {
    var clientID = config.GOOGLE_CLIENTID;
    return (
      <div>
        <div className='loginBtn'>
          <GoogleLogin
            className="g-signin2"
            clientId={clientID}
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
