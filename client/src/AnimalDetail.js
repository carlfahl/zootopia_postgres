// This is a view for showing the Details of One animal

import React from 'react';
import { Well, Panel, Form, FormControl, Button } from 'react-bootstrap';
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
        newReplyText: null,
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
      self.setState({name: data.animal.name, species: data.animal.species, comments: data.animal.animalComments});
    })
  },
  onChangeHandler: function (field, value) {
    var newData = {};
    newData[field] = value;
    this.setState(newData);
  },
  searchComments: function () {
    if (this.searchText !== '') {
      var filteredComments = this.state.comments.filter((item) => {
        return (item.body.indexOf(this.state.searchText) !== -1);
      });
      this.setState({'filteredComments': filteredComments});
    }
  },
  onSubmitHandler: function (e) {
    e.preventDefault();
    const commentData = {text: this.state.newCommentText,
      title: this.state.newCommentTitle,
      user: this.props.auth.getUser(),
      picture: this.props.auth.getUserPic()};
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
    var newComment = {author: this.props.auth.getUser(),
      body: this.state.newCommentText,
      title: this.state.newCommentTitle,
      picture: this.props.auth.getUserPic()};
    comments.push(newComment);
    this.setState({comments: comments});
  },
  postReply: function (commentId) {
    const commentData = {text: this.state.newReplyText,
      user: this.props.auth.getUser(),
      picture: this.props.auth.getUserPic()};
    console.log(commentData);
    $.ajax({
      url: '/api/animals/' + this.props.params.animalId + '/comments/' + commentId + '/replies',
      method: 'POST',
      data: commentData
    }).done(function (data) {
      console.log(data);
      window.location = '/animals/' + this.props.params.animalId;
    });
  },
  renderComments: function () {
    return this.state.comments.map((item) => {
      if (this.state.filteredComments.includes(item)) {
        var style = "success";
      } else {
        var style = "default";
      }
      console.log(style);
      return (<Panel header={item.title} bsStyle={style}>
                <p>{item.body}</p>
                <span><strong><img src={item.picture} alt="profile pic" />
                --{item.author}</strong></span>
              {item.commentReplies.map(reply => {
                return (
                  <Panel header={`Reply by ${reply.user}`} >
                    <img src={reply.picture} alt='profile pic' />
                    <p>{reply.text}</p>
                  </Panel>
                )
              })}
              <Form>
                <FormControl type='text'
                  onChange={(event) => this.onChangeHandler('newReplyText', event.target.value)}
                  placeholder='reply...' />
              </Form>
              <Button bsStyle='primary' onClick={() => this.postReply(item.id)}>Post Reply</Button>
            </Panel>);
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
