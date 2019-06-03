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
        <button className={styles.addToWatched}
          onClick={() => {
            this.props.onClick(true);
            document.getElementById('addShowForm').reset();
          }}
          disabled={!this.props.isFormValid}>Add to Watched</button>
    }

    return(
      <div className={styles.popup}>
        <div className={styles.form}>
          {this.props.firstSubmit ?
          <h1>Add Show</h1>
        : <h1>Add Another Show</h1>}

          <form
            className={styles.addShowForm}
            id='addShowForm'
            >

            <input
              className={styles.nameInput}
              name='name'
              placeholder='Name'
              type='text'
              autoComplete='off'
              onChange={this.props.onChange}
              />

            <input
              className={styles.urlInput}
              name='url'
              placeholder='Link (optional)'
              type='url'
              onChange={this.props.onChange}
              />

            <h2 className={styles.formTagsHeading}>Tag the show</h2>
            <div className={styles.formTags}>
              <ButtonTags tags={this.props.tags} onTagClick={this.props.onTagClick} />
            </div>

            <input
              className={styles.customTagsInput}
              name='customTags'
              placeholder='Custom Tags (separate by commas)'
              type='text'
              onChange={this.props.onChange}
              />

            <button
              className={styles.addToWatchlist}
              onClick={() => {
                this.props.onClick(false);
                document.getElementById('addShowForm').reset();
              }}
              disabled={!this.props.isFormValid}
              >
                Add to Watchlist
              </button>

            {watchedButton}

            <button onClick={this.props.closePopup}>Exit form</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddShow;
