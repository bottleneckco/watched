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
        { id: 0, name: "English" },
        { id: 2, name: "Japanese"},
        { id: 4, name: "Korean"},
        { id: 6, name: "Tamil"}
      ],
      languages: [
        { id: 0, name: "English" },
        { id: 2, name: "Japanese"},
        { id: 4, name: "Korean"},
        { id: 6, name: "Tamil"}
      ],
      genres: [
        { id: 1, name: "Documentary"},
        { id: 3, name: "Drama"},
        { id: 5, name: "Movie" },
        { id: 7, name: "Variety"}
      ]

    }

    this.handleDelete = (i) => {
      if(this.state.tags.length > 0) {
        const tag = this.state.tags[i];
        const tags = this.state.tags.slice(0);
        tags.splice(i, 1);
        this.setState({ tags });



          if(tag.id % 2 == 0) {     // language list
            var languages = this.state.languages;
            const suggestions = this.state.languages;
            languages[myIndexOf(languages, tag)].disabled = false;
            this.setState({ languages });
            this.setState({ suggestions });
          }
          else {                    // genre list
            var genres = this.state.genres;
            var suggestions = this.state.genres;

            // reset suggestions back to languages when last tag removed
            if (tags.length == 0)
              suggestions = this.state.languages;

            genres[myIndexOf(genres, tag)].disabled = false;
            this.setState({ genres });
            this.setState({ suggestions });
          }
        }
      else {
        console.log("Nothing to delete.");
      }
    }

    this.handleAddition = (tag) => {
      if(this.state.tags.length < 2) {
        const tags = [].concat(this.state.tags, tag);
        this.setState({ tags });

        if(tag.id % 2 == 0) {
          var languages = this.state.languages;
          const suggestions = this.state.genres;
          languages[myIndexOf(languages, tag)].disabled = true;
          this.setState({ languages });
          this.setState({ suggestions });
        }
        else {
          var genres = this.state.genres;
          const suggestions = this.state.languages;
          genres[myIndexOf(genres, tag)].disabled = true;
          this.setState({ genres });
          this.setState({ suggestions });
        }
      }

      if(this.state.tags.length == 1) {
        const suggestions = [];
        this.setState({ suggestions });
      }
    }

    function myIndexOf(arr, obj) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == obj.id && arr[i].name == obj.name) {
          return i;
        }
      }
      return -1;
    }
  }
  render() {
    return(
      <div>
        <div>Categories</div>
        <ReactTags
          autofocus={true}
          autoresize={false}
          className="reactTags"
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
