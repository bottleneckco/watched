import React, { Component } from 'react';

import styles from './styles.scss';

class Header extends Component {

  render() {
    return (
      <div className={styles.loginHeader}>
        <h1>Watched</h1>
      </div>
    );
  }
}

export default Header;
