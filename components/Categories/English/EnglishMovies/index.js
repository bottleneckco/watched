import React, { Component } from 'react';
import EnglishMovies2010 from './2010 English Movies.json';

import styles from './styles.scss';

class EnglishMovies extends Component {
  constructor(props){
    super(props);
    this.state =  {
                    list: ["empty"]
                  };
  }

  componentDidMount() {
    var fullList = [];

    for(var x in EnglishMovies2010) {
      for(var y in EnglishMovies2010[x]) {
        fullList.push(EnglishMovies2010[x][y].name);
      }
    }

    this.setState({ list: fullList });
  }

  render() {
    if(this.props.render)
    {
      return(
        <div>
          <h1>List of English Movies</h1>
          <ul className="list">
            {this.state.list.map(d => <li key={d}>{d}</li>)}
          </ul>
        </div>
      );
    }
    else {
      return <div></div>;
    }
  }
}

export default EnglishMovies;
