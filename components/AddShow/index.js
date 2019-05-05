import React, { Component } from 'react';

import ButtonTags from '../ButtonTags';
import Header from '../Header';
import styles from './styles.scss';

class AddShow extends Component {

  render() {
    const isListEmpty = this.props.emptyList;
    let watchedButton;

    if(isListEmpty)
      watchedButton = <div style={{display: 'none'}}></div>
    else {
      watchedButton =
        <button onClick={() => { this.props.onClick(true) }}
                disabled={!this.props.isFormValid}>Add to Watched</button>
    }

    return(
      <div className={styles.popup}>
        <div className={styles.form}>
          {this.props.firstSubmit ?
          <h1>Add Show</h1>
        : <h1>Add Another Show</h1>}

          <form>

            <input  name="name"
                    placeholder="Name"
                    type="text"
                    autoComplete="off"
                    onChange={this.props.onChange}
            />
          <input  name="url"
                    placeholder="Link (optional)"
                    type="url"
                    onChange={this.props.onChange}
            />

            <h2>Tag the show</h2>
            <ButtonTags tags={this.props.tags} onTagClick={this.props.onTagClick} />
            <input  name="customTags"
                    placeholder="Custom Tags (separate by commas)"
                    type="text"
                    onChange={this.props.onChange}
            />
          {watchedButton}
            <button onClick={() => { this.props.onClick(false) }}
                    disabled={!this.props.isFormValid}
                    >
              Add to Watchlist
            </button>

            <button onClick={this.props.closePopup}>Exit form</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddShow;
