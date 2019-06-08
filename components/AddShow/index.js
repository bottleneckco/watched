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
            document.getElementById('addShowForm').reset();
            this.props.onClick(true);
          }}
          disabled={!this.props.isFormValid}>Add to Watched</button>
    }
    
    return(
      <div className={styles.formContainer}>
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
            placeholder='Name (required)'
            type='text'
            autoComplete='off'
            onChange={this.props.onChange}
            />

          <input
            className={styles.urlInput}
            name='url'
            placeholder='Link'
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
            placeholder='Custom Tags (separate by &apos;,&apos; )'
            type='text'
            onChange={this.props.onChange}
            />

          <div className={styles.formButtons}>
            <button
              className={styles.addToWatchlist}
              onClick={() => {
                document.getElementById('addShowForm').reset();
                this.props.onClick(false);
              }}
              disabled={!this.props.isFormValid}
              >
                Add to Watchlist
              </button>

            {watchedButton}
          </div>
        </form>
      </div>
    );
  }
}

export default AddShow;
