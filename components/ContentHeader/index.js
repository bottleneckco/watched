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
    const selectedStyle = {
      backgroundColor: '#444',
      color: '#fff'
    }

    const unselectedStyle = {
      backgroundColor: '#fff',
      color: '#444'
    }

    return (
      <div className={styles.contentHeader}>
        <h2 className={styles.name}>{this.props.user.name}</h2>
        <h1
          className={styles.watched}
          style={this.state.watchlistSelected ? unselectedStyle : selectedStyle}
          onClick={() => { this.handleContentHeaderClick(false) }}>WATCHED</h1>
        <h1
          className={styles.watchlist}
          style={this.state.watchlistSelected ? selectedStyle : unselectedStyle}
          onClick={() => { this.handleContentHeaderClick(true) }}>WATCHLIST</h1>
      </div>
    );
  }
}

export default ContentHeader;
