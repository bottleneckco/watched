import React, { Component } from 'react';

import Korean from './Korean';
import English from './English';

class Categories extends Component {
  constructor(props){
    super(props);
    this.state = {
      english: false,
      japanese: false,
      korean: false,
      tamil: false,

      genre: "undefined"
     };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.tags !== nextProps.tags) {
      const tags = nextProps.tags;
      var updatedState = {
        english: false,
        japanese: false,
        korean: false,
        tamil: false,

        genre: "undefined"
       };

     if(tags[0] == null) {
       console.log("undefined language category");
     }
     else {
       switch (tags[0].name) {
          case "Korean": updatedState.korean = true;
            break;

          case "English": updatedState.english = true;
            break;

          case "Japanese": updatedState.japanese = true;
            break;

          case "Tamil": updatedState.tamil = true;
            break;

          default:
            break;
        };
     }

     if(tags[1] == null) {
       console.log("undefined genre category");
     }
     else {
       switch (tags[1].name) {
         case "Documentary": updatedState.genre = "documentary";
         break;

         case "Drama": updatedState.genre = "drama";
         break;

         case "Movie": updatedState.genre = "movie";
         break;

         case "Variety": updatedState.genre = "variety";
         break;

         default:
         break;
       };
     }

     this.setState(updatedState);
    }
  }

  render() {
    return(
      <div>
        <Korean render={this.state.korean} genre={this.state.genre} />
        <English render={this.state.english} genre={this.state.genre} />
      </div>
    );
  }
}

export default Categories;
