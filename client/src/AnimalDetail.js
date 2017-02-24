// This is a view for showing the Details of One animal

import React from 'react';
import { Well, Panel, form} from 'react-bootstrap';
import $ from 'jquery';

var AnimalDetail = React.createClass ({
  getInitialState: function () {
    return (
      {
        name: null,
        species: null,
        newCommentText: null,
        comments: null
      }
    );
  },
  componentWillMount: function () {
    this.getAnimalFromServer();
  },
  getAnimalFromServer: function () {
    var self = this;
    $.ajax({
      url: '/api/animals/' + this.props.params.animalId,
      method: 'GET'
    }).done(function (data) {
      self.setState({comments: data.comments});
    })
  },
  updateHandler: function () {
    return null;
  },
  onSubmitHandler: function () {
    $.ajax({
      url: '/api/animals/' + this.props.params.animalId + '/comments',
      METHOD: 'POST',
      data: null
    }).done(function (data) {
      console.log(data);
    });
    var comments = this.state.comments;
    // comments.push(text);
    this.setState({comments: comments});
  },
  renderComments: function () {
    return this.state.comments.map(function (item) {
      return (<Well>{item}</Well>)
    });
  },
  render: function () {
    return (
      <div>
        <Panel>
          <h4>props.animal.name</h4>
        </Panel>
        <Well>
          <span><strong>Comments</strong></span>
        </Well>
        {this.renderComments()}
      </div>
    );
  }
});

export default AnimalDetail;
