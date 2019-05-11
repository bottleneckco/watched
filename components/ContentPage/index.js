import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import AddShow from '../AddShow';
import ButtonTags from '../ButtonTags';
import ContentHeader from '../ContentHeader';
import List from '../List';
import styles from './styles.scss';

class ContentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      customTagsDB: null,       // custom tags that is in database
      selectedTags: [],      // tags that user selected
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
      },
      showForm: false,
      firstSubmit: false,
      viewWatchlist: true,
      currentList: null
    };
    console.log("Content Page");
  }

  componentDidMount() {
    this.unsubscribe = this.props.firebase.user(this.props.user.uid)
    .onSnapshot(snapshot => {
      /*var newArray = [];
      var customTagsDBLength = (snapshot.data().customTags) ? snapshot.data().customTags.length : 0;

      for(var i=0; i < (this.state.defaultTags.length + customTagsDBLength); i++) {
        newArray.push(null);
      }*/

      this.setState({
        user: snapshot.data(),
        customTagsDB: snapshot.data().customTags ? snapshot.data().customTags : [],
        currentList: snapshot.data().watchlist ? snapshot.data().watchlist.allShows : 'empty'
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
    if(formCustomTags.length != 0) {
      // Filter custom tags for existing tags
      if(this.state.customTagsDB.length != 0) {
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
    if(allSubmittedTags.length != 0) {
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

    this.setState({ firstSubmit: false });

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
    var tagNameFound = this.state.selectedTags.find((tagName) => { return tagName === tags.name });

    tagNameFound ?
    newSelectedArray = this.state.selectedTags.filter((tagName) => tagName != tagNameFound)  //unselected
    : newSelectedArray.push(tags.name);                                                       //selected

    console.log(newSelectedArray);
    this.setState({
      selectedTags: newSelectedArray,
      currentList: this.getSelectedShowsData(tags.name, tagNameFound, newSelectedArray)
    });
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

 getSelectedShowsData = (tagName, isTagUnselected, sTags) => {
   var cList = this.state.currentList;
   var userList = this.state.viewWatchlist ? this.state.user.watchlist : this.state.user.watched;
   var newData = [];

   if(!this.state.showForm) {
     if(sTags.length > 1) {

       if(isTagUnselected) {
         newData = (userList[sTags[0]]) ? userList[sTags[0]] : [];

         for(let i=1; i < sTags.length; i++) {
           let tempList = [];
           let currentTagShows = userList[sTags[i]] ? userList[sTags[i]] : [];

           currentTagShows.forEach((show) => {
             for(let i = 0; i < newData.length; i++) {
               if(show.name ===  newData[i].name) {
                 tempList.push(show);
                 break;
               }
             }
           });
           newData = tempList;
         }
       }
       else {
         let selectedTagShows = userList[tagName] ? userList[tagName] : [];

         selectedTagShows.forEach((show) => {
           for(let i = 0; i < cList.length; i++) {
             if(show.name === cList[i].name) {
               newData.push(show);
               break;
             }
           }
         });
       }
     }
     else {
       switch (sTags.length) {
         case 0: newData = userList.allShows;
         break;

         case 1: newData = (userList[sTags[0]]) ? userList[sTags[0]] : [];
         break;

         default: []
       }
     }
   };

   return newData;
 }

 toggleAddShow = () => {
   this.setState({
     showForm: !this.state.showForm,
     firstSubmit: true
    });
 }

 handleContentHeaderClick = (onWatchlistClick) => {
   var list = null;
   if(onWatchlistClick)
     list = (watchlist) ? watchlist.allShows : [];
   else
     list = (watched) ? watched.allShows : [];

   this.setState({
     viewWatchlist: onWatchlistClick,
     currentList: list
   });
 }

  render() {
  console.log("currentList: ", this.state.currentList);
  console.log("customTagsDB", this.state.customTagsDB);
    if(this.state.currentList === null) {
        return <h1> loading... </h1>;
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
      tags = tags.filter(tag => tag != undefined);

      return (
        <div>
          <ContentHeader
            onWatchedClick={this.handleContentHeaderClick}
            onWatchlistClick={this.handleContentHeaderClick}
            user={this.state.user}
            />

          <button onClick={this.toggleAddShow}>Add show</button>

          <ButtonTags
            onTagClick={this.handleButtonTagClick}
            tags={tags}
            />

          {this.state.showForm ?
            <AddShow
              onClick={this.handleSubmit}
              onChange={this.handleChange}
              onTagClick={this.handleButtonTagClick}
              tags={tags}
              emptyList={this.state.currentList != 'empty' ? false : true}
              closePopup={this.toggleAddShow}
              firstSubmit={this.state.firstSubmit}
              isFormValid={this.state.inputData.isFormValid} />
            : null }

          {this.state.currentList != 'empty' ?
            <List data={this.state.currentList} />
          : <h1>Your list is empty! Please add a show.</h1> }
        </div>
      );
    }
  }
}

export default withFirebase(ContentPage);
