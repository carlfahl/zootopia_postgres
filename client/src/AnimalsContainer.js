import React from 'react';
import AnimalsTable from './AnimalsTable';
import $ from 'jquery';

var AnimalsContainer = React.createClass({
  getInitialState: function () {
    return (
      {
        animals: null,
        limit: null,
        sort: null
      }
    );
  },
  componentWillMount: function () {
    this.props.getCurrentUser();
    this.getAnimalsFromServer();
  },
  onChangeHandler: function (field, value) {
    console.log(value);
    var newData = {};
    newData[field] = value;
    this.setState(newData);
  },
  reload: function () {
    this.getAnimalsFromServer();
  },
  getAnimalsFromServer: function () {
    if (this.state.limit && this.state.sort) {
      var query = '?limit=' + this.state.limit;
      query += '&sort=name';
    } else if (this.state.limit) {
      var query = '?limit=' + this.state.limit;
    } else if (this.state.sort) {
      var query = '?sort=name';
    } else {
      var query = '';
    }
    var query = this.state.select? '?select=name' : '';
    // var query = this.state.limit? '?limit=' + this.state.limit : '';
    // query += this.state.sort? '&sort=name' : '';
    console.log(query);
    $.ajax({
      url: '/api/animals/' + query,
      method: 'GET'
    }).done((data) => {
      console.log(data);
      this.setState({animals: data});
      console.log(this.state.animals);
    });
  },
  deleteHandler: function (id) {
    $.ajax({
      url: "/api/animals/" +id,
      method: 'DELETE'
    }).done((data) => {
      console.log(data);
    })
  },
  render: function () {
    return (
      <div>
        Welcome, {this.props.user.local.username}
        {this.state.animals ? <AnimalsTable onClickHandler={this.reload} onChangeHandler={this.onChangeHandler} animals={this.state.animals} deleteHandler={this.deleteHandler} /> : <span> I have no animals </span>}
      </div>
    );
  }
});

export default AnimalsContainer;
