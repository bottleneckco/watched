import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import AddShow from '../AddShow';
import ContentHeader from '../ContentHeader';
import styles from './styles.scss';

class ContentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emptyList: null,
      customTagsDB: null,       // custom tags that is in database
      selectedTags: null,      // tags that user selected during form submit
      defaultTags: [
        {name: 'Comedy', color: '#FFFF00'},
        {name: 'Drama', color: '#FF7373'},
        {name: 'English', color: '#33FFFF'},
        {name: 'Movies', color: '#7B68EE'}
      ],
      inputData: {
        name: '',
        url: '',
        customTags: '',     // custom tags that user typed during form submit
        isFormValid: false
      }
    };
    console.log("Content Page");
  }

  componentDidMount() {
    this.unsubscribe = this.props.firebase.user(this.props.user.uid)
    .onSnapshot(snapshot => {
      var newArray = [];
      var customTagsDBLength = (snapshot.data().customTags) ? snapshot.data().customTags.length : 0;
      var showsLength = (snapshot.data().watchlist) ? snapshot.data().watchlist.allShows.length : 0;

      for(var i=0; i < (this.state.defaultTags.length + customTagsDBLength); i++) {
        newArray.push(null);
      }
      this.setState({
        user: snapshot.data(),
        emptyList: showsLength == 0,
        selectedTags: newArray,
        customTagsDB: snapshot.data().customTags ? snapshot.data().customTags : []
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  handleSubmit = (isWatchedSubmit) => {
    var userRef = this.props.firebase.user(this.props.user.uid);
    var updateBatch = this.props.firebase.db.batch();
    var allSubmittedTags = this.state.selectedTags;
    var formCustomTags = this.state.inputData.customTags.split(/, | ,|,/);     // custom tags submitted by form
    var newShowData = {
      name: this.state.inputData.name,
      URL: this.state.inputData.url
    };

    //  Update all shows field
    if(isWatchedSubmit)
      updateBatch.update(userRef, { "watched.allShows": this.props.firebase.fieldValue.arrayUnion(newShowData) });
    else
      updateBatch.update(userRef, { "watchlist.allShows": this.props.firebase.fieldValue.arrayUnion(newShowData) });

    // Update custom tag field
    if(formCustomTags[0]) {
      // Filter custom tags for existing tags
      if(this.state.customTagsDB[0] != '') {
        var filteredFormCustomTags = [];
        var inDB = false;

        formCustomTags.forEach((formTag) => {
          this.state.customTagsDB.forEach((DBtag) => {
            if(formTag === DBtag)
              inDB = true;
          });

          if(!inDB)
            filteredFormCustomTags.push(formTag);
          else
            inDB = false;
        });

        if(filteredFormCustomTags[0]) {
          var updatedCustomTags = this.state.customTagsDB.concat(filteredFormCustomTags);

          allSubmittedTags = filteredFormCustomTags.concat(this.state.selectedTags);
          updateBatch.update(userRef, { "customTags": updatedCustomTags });
          this.setState({ customTagsDB: updatedCustomTags });
        }
      }
      else
        updateBatch.update(userRef, { "customTags": formCustomTags });
    }

    // Update all tag fields
    if(allSubmittedTags[0]) {
      var tagName = 'NIL';
      var tagObj = {};

      allSubmittedTags.forEach((tag) => {
        if(tag) {
          if(isWatchedSubmit)
            tagName = "watched." + tag;
          else
            tagName = "watchlist." + tag;

          tagObj[tagName] = this.props.firebase.fieldValue.arrayUnion(newShowData);
          updateBatch.update(userRef, tagObj);
        }
      });     //end forEach
    }

    updateBatch.commit().then(
      (result) => {
      console.log("update successful: ", result);
    },
      (error) => {
      console.log("update failed: ", error)
    }).catch((error) => {
      console.log("Error updating document: ", error);
    });

    console.log("End submit");
    event.preventDefault();
  }

  handleButtonTagClick = (tags, index) => {
    var newSelectedArray = this.state.selectedTags;

    if(newSelectedArray.length > index) {
      if(newSelectedArray[index] === tags.name)
        newSelectedArray[index] = null;
    else
        newSelectedArray[index] = tags.name;

    console.log(newSelectedArray);
    this.setState({ selectedTags: newSelectedArray });
  }
  else {
   console.log("index out of newSelectedArray (ButtonTags) bounds");
  }
}

 handleChange = event => {
   const name = event.target.name;
   const value = event.target.value;
   let updatedData = this.state.inputData;

   updatedData[name] = value;

   if(updatedData.name === '')
     updatedData.isFormValid = false;
   else
     updatedData.isFormValid = true;

   this.setState({ inputData: updatedData });
 }

  render() {
    if(this.state.emptyList === null) {
        return <h1> loading... </h1>
    }
    else {
      let customTagsArray = [];
      let buttonTag = {};
      this.state.customTagsDB.forEach((tag) => {
        if(tag) {
          buttonTag = {
            name: tag,
            color: '#FFD700'
          }
          customTagsArray.push(buttonTag);
        }
      });

      let tags = this.state.defaultTags.concat(customTagsArray);
      tags = tags.filter(tag => tag != undefined)

      if(this.state.emptyList) {
        return <AddShow onClick={this.handleSubmit}
                        onChange={this.handleChange}
                        onTagClick={this.handleButtonTagClick}
                        tags={tags}
                        emptyList={this.state.emptyList}
                        isFormValid={this.state.inputData.isFormValid} />
      }
      else {
        return <ContentHeader user={this.state.user}
                              onClick={this.handleSubmit}
                              onChange={this.handleChange}
                              onTagClick={this.handleButtonTagClick}
                              tags={tags}
                              emptyList={this.state.emptyList}
                              isFormValid={this.state.inputData.isFormValid}/>
      }
    }
  }
}

export default withFirebase(ContentPage);
