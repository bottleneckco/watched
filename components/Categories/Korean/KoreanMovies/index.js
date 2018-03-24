import React, { Component } from 'react';

import styles from './styles.scss';

class KoreanMovies extends Component {
  render() {
    if(this.props.render)
    {
      return(
        <div>
          <h1>List of Korean Movies</h1>
        </div>
      );
    }
    else {
      return <div></div>;
    }
  }
}

export default KoreanMovies;
