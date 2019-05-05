import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import ContentPage from '../ContentPage';
import styles from './styles.scss';

class LoginWithGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuthState: null,
      user:  null,
      error: null
    };
    console.log("Login Page");
  }

  onSubmit = (event) => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        return this.props.firebase.user(socialAuthUser.user.uid).set(
          {
            name: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            photoURL: socialAuthUser.user.photoURL
          },
          { merge: true },
        );
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(userAuthState => {
      userAuthState
      ? this.setState({
        userAuthState,
        user: {
            name: userAuthState.displayName,
            email: userAuthState.email,
            photoURL: userAuthState.photoURL,
            uid: userAuthState.uid
        }
      })
      : this.setState({ userAuthState: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { error } = this.state;
    if(this.state.userAuthState)
      return <ContentPage user={this.state.user}/>
    else {
      return (
        <form onSubmit={this.onSubmit}>
          <h1>Please sign in.</h1>
          <button className={styles.login} type="submit">Sign In with Google</button>

          {error && <p>{error.message}</p>}
        </form>
      );
    }
  }
}

const Login = withFirebase(LoginWithGoogle);

export default Login;
