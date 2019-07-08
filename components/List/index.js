import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import DeleteShowButton from '../DeleteShowButton';
import styles from './styles.scss';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    console.log("List");
  }

  makeList = (data, index) => {
    return (
      <li
        className={styles.listRow}
        key={data.name} >
        <div className={styles.showData}>
          {
            data.URL != "" ?
            <a href={data.URL} target="_blank">
              {data.name}
            </a>
            : data.name
          }
        </div>
        <div
          className={styles.deleteShowButton}>
          <DeleteShowButton
            target={data}
            uid={this.props.uid}
            viewWatchlist={this.props.viewWatchlist}
             />
        </div>
      </li>
    );
  }

  render() {
    return(
      <div>
        <ul className={styles.list}>
          {this.props.data.length != 0 ? this.props.data.map(this.makeList) : <h1>No shows under these tag(s)</h1>}
        </ul>
      </div>
    );
  }
}

export default withFirebase(List);
