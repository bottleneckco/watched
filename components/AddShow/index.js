import React, { Component } from 'react';

import ButtonTags from '../ButtonTags';
import Header from '../Header';
import styles from './styles.scss';

class AddShow extends Component {

  render() {
    const isListEmpty = this.props.emptyList;
    let description, watchedButton;
    
    if(isListEmpty) {
      watchedButton = <div style={{display: 'none'}}></div>
      description = <h2>Your list is empty.</h2>;
    }
    else {
      watchedButton =
        <button onClick={() => { this.props.onClick(this.state.inputData, true) }}
                disabled={!this.props.isFormValid}>Add to Watched</button>
    }

    return(
        <div className="addshow">
          {description}
          <form>

            <div>Add to your list.</div>
            <input  name="name"
                    placeholder="Name"
                    type="text"
                    autoComplete="off"
                    onChange={this.props.onChange}
                    required
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

          </form>
        </div>
    );
  }
}

export default AddShow;
