import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

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
      key={data.name} >
        {
          data.URL != "" ?
          <a href={data.URL} target="_blank">
            {data.name}
          </a>
          : data.name
        }
      </li>
    );
  }

  render() {
    return(
      <div>
        <ul>
          {this.props.data.length != 0 ? this.props.data.map(this.makeList) : <h1>No shows under these tag(s)</h1>}
        </ul>
      </div>
    );
  }
}

export default withFirebase(List);
