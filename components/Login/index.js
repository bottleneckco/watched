import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

import styles from './styles.scss';

const Login = (props) => (
  <div className={styles.loginBtn}>
    <GoogleLogin
      className={styles['g-signin2']}
      clientId={process.env.GOOGLE_CLIENT_ID}
      onSuccess={(googleUser) => { props.onSignIn(googleUser); }}
      tag="div"
      scope="https://www.googleapis.com/auth/drive.appfolder"
    />
  </div>
);

Login.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default Login;
