import React, { Component } from 'react';

import Header from '../Header';
import Login from '../Login';
import styles from './styles.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false
    };
  }

  render() {
    return (
      <div className={styles.app}>
        <Header />
        <Login />
      </div>
    );
  }
}

export default App;
