import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CategoryTags from '../CategoryTags';
import styles from './styles.scss';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyList: true,
    };
  }

  render() {
    return (
      <div className={styles.content} id="content">
        {
          this.state.emptyList ? (
            <div>
              <h1>Looks like you&#39;re new! Select your favourite category from below.</h1>
              <CategoryTags />
            </div>
          ) : (
            <div>
              <h1>your watched list</h1>
            </div>
          )
        }
        <div id="logoutBtn" className={styles.logout} href="#" onClick={this.props.onSignOut}>Sign out</div>
      </div>
    );
  }
}

Content.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default Content;
