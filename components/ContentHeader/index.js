import React, { Component } from 'react';

import AddShow from '../AddShow';
import styles from './styles.scss';

class ContentHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchlistSelected: true
    }
  }

  handleContentHeaderClick = (watchlist) => {
    if(watchlist) {
      this.setState({ watchlistSelected: true });
      this.props.onWatchedClick(true);
    }
    else {
      this.setState({ watchlistSelected: false });
      this.props.onWatchedClick(false);
    }
  }

  render() {

    return (
      <div className={styles.contentHeader}>
        <h2 className={styles.name}>{this.props.user.name}</h2>
        <h1
          className={this.state.watchlistSelected ? styles.watchedUnselected : styles.watchedSelected}
          onClick={() => { this.handleContentHeaderClick(false) }}>WATCHED</h1>
        <h1
          className={this.state.watchlistSelected ? styles.watchlistSelected : styles.watchlistUnselected}
          onClick={() => { this.handleContentHeaderClick(true) }}>WATCHLIST</h1>
      </div>
    );
  }
}

export default ContentHeader;
