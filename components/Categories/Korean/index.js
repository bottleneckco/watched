import React, { Component } from 'react';

import KoreanMovies from './KoreanMovies';
import styles from './styles.scss';

class Korean extends Component {
  constructor(props){
    super(props);
    this.state = {
      documentary: false,
      drama: false,
      movie: false,
      variety: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.genre !== nextProps.genre) {
      const genre = nextProps.genre;
      var updatedState = {
        documentary: false,
        drama: false,
        movie: false,
        variety: false
      };

      switch (genre) {
        case "documentary": updatedState.documentary = true;
          break;

        case "drama": updatedState.drama = true;
          break;

        case "movie": updatedState.movie = true;
          break;

        case "variety": updatedState.variety = true;
          break;

        default:
          break;
      }
      
      this.setState(updatedState);
    }
  }

  render() {
    if(this.props.render)
    {
      return(
        <div>
          <h1>Korean</h1>
          <KoreanMovies render={this.state.movie} />
        </div>
      );
    }
    else {
      return <div></div>;
    }
  }
}

export default Korean;
