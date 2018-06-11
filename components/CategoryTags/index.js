import React, { Component } from 'react';
import ReactTags from 'react-tag-autocomplete';

import Categories from '../Categories';
import styles from './styles.scss';

class CategoryTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      suggestions: [
        { id: 0, name: 'English' },
        { id: 2, name: 'Japanese' },
        { id: 4, name: 'Korean' },
        { id: 6, name: 'Tamil' },
      ],
      languages: [
        { id: 0, name: 'English' },
        { id: 2, name: 'Japanese' },
        { id: 4, name: 'Korean' },
        { id: 6, name: 'Tamil' },
      ],
      genres: [
        { id: 1, name: 'Documentary' },
        { id: 3, name: 'Drama' },
        { id: 5, name: 'Movie' },
        { id: 7, name: 'Variety' },
      ],
    };

    this.handleDelete = (i) => {
      if (this.state.tags.length > 0) {
        const tag = this.state.tags[i];
        const tags = this.state.tags.slice(0);
        tags.splice(i, 1);
        this.setState({ tags });

        if (tag.id % 2 === 0) {
          // language list
          const { languages } = this.state;
          const suggestions = this.state.languages;
          languages[languages.indexOf(tag)].disabled = false;
          this.setState({ languages });
          this.setState({ suggestions });
        } else {
          // genre list
          const { genres } = this.state;
          let suggestions = this.state.genres;

          // reset suggestions back to languages when last tag removed
          if (tags.length === 0) {
            suggestions = this.state.languages;
          }

          genres[genres.indexOf(tag)].disabled = false;
          this.setState({ genres });
          this.setState({ suggestions });
        }
      } else {
        console.log('Nothing to delete.');
      }
    };

    this.handleAddition = (tag) => {
      if (this.state.tags.length < 2) {
        const tags = [].concat(this.state.tags, tag);
        this.setState({ tags });

        if (tag.id % 2 === 0) {
          const { languages } = this.state;
          const suggestions = this.state.genres;
          languages[languages.findIndex(tag)].disabled = true;
          this.setState({ languages });
          this.setState({ suggestions });
        } else {
          const { genres } = this.state;
          const suggestions = this.state.languages;
          genres[genres.indexOf(tag)].disabled = true;
          this.setState({ genres });
          this.setState({ suggestions });
        }
      }

      if (this.state.tags.length === 1) {
        const suggestions = [];
        this.setState({ suggestions });
      }
    }
  }
  render() {
    return (
      <div>
        <div>Categories</div>
        <ReactTags
          autofocus
          autoresize={false}
          className={styles['react-tags']}
          handleAddition={this.handleAddition}
          handleDelete={this.handleDelete}
          handleInputChange={this.handleInputChange}
          minQueryLength={0}
          maxSuggestionsLength={10}
          placeholder="Add a category tag"
          suggestions={this.state.suggestions}
          tags={this.state.tags}
        />

        <Categories tags={this.state.tags} />
      </div>
    );
  }
}

export default CategoryTags;
