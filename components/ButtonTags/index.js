import React, { Component } from 'react';

import styles from './styles.scss';

class ButtonTags extends Component {
  constructor(props) {
    super(props);

    this.state = { buttons: {} };
  }

   makeButton = (tags, index) => {
    var buttonStyle = {
      backgroundColor: tags.color
    };

    return (
      <button
      key={tags.name}
      id={tags.name}
      type='button'
      style={buttonStyle}
      onClick={() => this.handleClick(tags, index)}>
        {tags.name}
      </button>
    );
  }

  handleClick = (tags, index) => {
    document.getElementById(tags.name).style.filter = this.state.buttons[tags.name] ? 'brightness(80%)' : 'brightness(110%)';
    document.getElementById(tags.name).style.border = this.state.buttons[tags.name] ? 'medium solid white' : 'medium solid grey';
    this.props.onTagClick(tags, index);

    this.setState((prevState) => {
      const buttons = Object.assign({}, prevState.buttons, { [tags.name]: !prevState.buttons[tags.name] });
      return { buttons };
    });
  }

  render() {
    return (
      <div className={styles.buttonTags}>
        {this.props.tags.map(this.makeButton)}
      </div>
    );
  }
}

export default ButtonTags;
