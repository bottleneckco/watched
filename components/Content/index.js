import React, { Component } from 'react';

import CategoryTags from '../CategoryTags';
import styles from './styles.scss';

class Content extends Component {
  constructor(props){
    super(props);
    this.state = { emptyList: true };

    this.handleSignOut = (e) => {
      this.props.onSignOut(e);
    }
  }

  render() {
    if(this.state.emptyList) {
      return(
        <div className="content" id="content">
          <h1>Looks like you're new! Select your favourite category from below.</h1>
          <CategoryTags />
          <div id='logoutBtn' className="logout" href="#" onClick={this.handleSignOut}>Sign out</div>
        </div>
      );
    }
    else {
      return(
          <div className="content" id="content">
            <div>your watched list</div>
            <div id='logoutBtn' className="logout" href="#" onClick={this.handleSignOut}>Sign out</div>
          </div>
      );
    }

  }
}

export default Content;
