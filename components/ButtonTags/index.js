import React, { Component } from 'react';

import styles from './styles.scss';

class ButtonTags extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.selectedTags.forEach((tagName) => {
        document.getElementById(tagName).style.filter = 'brightness(110%)';
        document.getElementById(tagName).style.border = 'medium solid grey';
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.resetFormTags &&  this.props.selectedTags.length != 0) {
      this.props.selectedTags.forEach((tagName) => {
          document.getElementById(tagName).style.filter = 'brightness(80%)';
          document.getElementById(tagName).style.border = 'medium solid white';
      });
    }
    return nextProps.resetFormTags && this.props.selectedTags.length != 0;
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

  handleClick(tags, index) {
    this.props.onTagClick(tags);

    document.getElementById(tags.name).style.filter = this.props.buttonState[tags.name] ? 'brightness(110%)' : 'brightness(80%)';     // on : off
    document.getElementById(tags.name).style.border = this.props.buttonState[tags.name] ? 'medium solid grey' : 'medium solid white';
    console.log(tags.name + ": " + this.props.buttonState[tags.name]);
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
