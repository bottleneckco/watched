import React, { Component } from 'react';

import AddShow from '../AddShow';
import styles from './styles.scss';

class ContentHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.contentHeader}>
        <h2 className={styles.name}>{this.props.user.name}</h2>
        <h1 className={styles.watched} onClick={() => { this.props.onWatchedClick(false) }}>WATCHED</h1>
        <h1 className={styles.watchlist} onClick={() => { this.props.onWatchlistClick(true) }}>WATCHLIST</h1>
      </div>
    );
  }
}

export default ContentHeader;
