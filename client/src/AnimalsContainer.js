import React from 'react';
import AnimalsTable from './AnimalsTable';
import $ from 'jquery'

var AnimalsContainer = React.createClass({
  getInitialState: function () {
    return ({animals: null});
  },
  componentWillMount: function () {
    this.getAnimalsFromServer();
  },
  getAnimalsFromServer: function () {
    var that = this;
    $.ajax({
      url: '/api/animals/',
      method: 'GET'
    }).done(function (data) {
      console.log(data);
      that.setState({animals: data});
      console.log(that.state.animals);
    })
  },
  deleteHandler: function (id) {
    var that = this;
    $.ajax({
      url: "/api/animals/" +id,
      method: 'DELETE'
    }).done(function (data) {
      console.log(data);
    })
  },
  updateHandler: function (id) {
    this.props.updateActiveComponent("editAnimal", id)
  },
  render: function () {
    return (
      <div>
        {this.state.animals ? <AnimalsTable animals={this.state.animals} deleteHandler={this.deleteHandler} updateHandler={this.updateHandler}/> : <span> I have no animals </span>}
      </div>
    );
  }
})

export default AnimalsContainer;
