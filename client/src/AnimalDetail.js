// This is a view for showing the Details of One animal

import React from 'react';
import { Well, Panel } from 'react-bootstrap';
import $ from 'jquery';
import NewCommentForm from './NewCommentForm';
import SearchForm from './SearchForm';

var AnimalDetail = React.createClass ({
  getInitialState: function () {
    return (
      {
        name: null,
        species: null,
        newCommentText: null,
        newCommentTitle: null,
        comments: [],
        filteredComments: [],
        searchText: null
      }
    );
  },
  componentWillMount: function () {
    this.getAnimalFromServer();
  },
  getAnimalFromServer: function () {
    var self = this;
    console.log(this.props.params.animalId);
    $.ajax({
      url: '/api/animals/' + this.props.params.animalId,
      method: 'GET'
    }).done(function (data) {
      console.log(data);
      self.setState({name: data.name, species: data.species, comments: data.comments});
    })
  },
  onChangeHandler: function (field, value) {
    var newData = {};
    newData[field] = value;
    this.setState(newData);
  },
  searchComments: function () {
    if (this.searchText !== '') {
      var self = this;
      var filteredComments = this.state.comments.filter(function (item) {
        return (item.body.indexOf(self.state.searchText) !== -1);
      });
      this.setState({'filteredComments': filteredComments});
    }
  },
  onSubmitHandler: function (e) {
    e.preventDefault();
    const commentData = {text: this.state.newCommentText, title: this.state.newCommentTitle};
    console.log(commentData);
    $.ajax({
      url: '/api/animals/' + this.props.params.animalId + '/comments',
      method: 'POST',
      data: commentData
    }).done(function (data) {
      console.log(data);
    });
    var comments = this.state.comments;
    if (!comments) {
      comments = [];
    }
    var newComment = {author: {local: {username: this.props.user.local.username}}, body: this.state.newCommentText, title: this.state.newCommentTitle};
    comments.push(newComment);
    this.setState({comments: comments});
  },
  renderComments: function () {
    var self = this;
    return this.state.comments.map(function (item) {
      if (self.state.filteredComments.includes(item)) {
        var style = "success";
      } else {
        var style = "default";
      }
      console.log(style);
      return (<Panel header={item.title} bsStyle={style}>
                <p>{item.body}</p>
                <span><strong>--{item.author.local.username}</strong></span>
              </Panel>)
    });
  },
  render: function () {
    return (
      <div>
        <Panel>
          <h4>{this.state.name}</h4>
        </Panel>
        <Panel>
          <h5><strong>Comments</strong></h5>
        </Panel>
        <SearchForm onChangeHandler={this.onChangeHandler} searchComments={this.searchComments} />
        {this.renderComments()}
        <NewCommentForm onChangeHandler={this.onChangeHandler} onSubmitHandler={this.onSubmitHandler}/>
      </div>
    );
  }
});

export default AnimalDetail;
