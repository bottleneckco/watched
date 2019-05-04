import React, { Component } from 'react';

import styles from './styles.scss';

class ButtonTags extends Component {
  constructor(props) {
    super(props);
  }

   makeButton = (tags, index) => {
    var buttonStyle = {
      backgroundColor: tags.color
    };

    return (
      <button
      key={tags.name}
      type='button'
      style={buttonStyle}
      onClick={() => this.props.onTagClick(tags, index)}>
        {tags.name}
      </button>
    );
  }

  render() {
    return (
      <div>
        {this.props.tags.map(this.makeButton)}
      </div>
    );
  }
}

export default ButtonTags;
