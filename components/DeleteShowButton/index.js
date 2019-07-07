import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import styles from './styles.scss';

class DeleteShowButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      customTagsDB: null
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.firebase.user(this.props.uid)
    .onSnapshot(snapshot => {
      this.setState({
        user: snapshot.data(),
        customTagsDB: snapshot.data().customTags ? snapshot.data().customTags : []
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  handleClick = () => {
    var userRef = this.props.firebase.user(this.props.uid);
    var userList = this.props.viewWatchlist ? this.state.user.watchlist : this.state.user.watched;
    var tags = Object.keys(userList);

    //backup
    this.props.firebase.user(this.props.uid + "-backup").set(this.state.user);

    // update map
    tags.forEach((tag) => {
      if(userList[tag].length > 0) {
        userList[tag] = userList[tag].filter((show) => { return String(show.name) != this.props.target.name; });
        if(userList[tag].length == 0)
          delete userList[tag];
      }
    });

    // update user database with new map
    this.props.viewWatchlist ?
    userRef.update({ watchlist: userList })
    : userRef.update({ watched: userList});
  }

  render() {
    return (
      <div className={styles.deleteButton}>
        <button onClick={() => this.handleClick()}>
          X
        </button>
      </div>
    );
  }
}

export default withFirebase(DeleteShowButton);
