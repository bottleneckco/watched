import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EnglishMovies from './EnglishMovies';
import styles from './styles.scss';

class English extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentary: false,
      drama: false,
      movie: false,
      variety: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.genre !== nextProps.genre) {
      const { genre } = nextProps;
      const updatedState = {
        documentary: false,
        drama: false,
        movie: false,
        variety: false,
      };

      switch (genre) {
        case 'documentary':
          updatedState.documentary = true;
          break;

        case 'drama':
          updatedState.drama = true;
          break;

        case 'movie':
          updatedState.movie = true;
          break;

        case 'variety':
          updatedState.variety = true;
          break;

        default:
          break;
      }

      this.setState(updatedState);
    }
  }

  render() {
    return this.props.render ? (
      <div>
        <h1>English</h1>
        <EnglishMovies render={this.state.movie} />
      </div>
    ) : (
      <div />
    );
  }
}

English.propTypes = {
  genre: PropTypes.string.isRequired,
  render: PropTypes.bool.isRequired,
};

export default English;
