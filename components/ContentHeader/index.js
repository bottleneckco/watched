import React, { Component } from 'react';

import AddShow from '../AddShow';
import LogoutButton from '../LogoutButton';
import styles from './styles.scss';

class ContentHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };


  }

  render() {
    return (
      <div>
        <h1>WATCHED</h1>
        <h1>WATCHLIST</h1>
        <h2>{this.props.user.name}</h2>
        <LogoutButton className={styles.logout}/>
      </div>
    );
  }
}

export default ContentHeader;
