import React from 'react';
import PostAnimalForm from './PostAnimalForm';
import $ from 'jquery';

var PostAnimalContainer = React.createClass ({
  getInitialState: function () {
    return ({name:null, species: null});
  },
  onChangeHandler: function (field, value) {
    var newData = {};
    newData[field] = value;
    this.setState(newData);
  },
  onClickHandler: function () {
    var that = this;
    $.ajax({
      url: '/api/animals',
      method: 'POST',
      data: this.state
    }).done(function (data) {
      console.log(data);
      that.props.updateActiveComponent('viewAll', null)
    })
  },
  render: function () {
    return(
      <div>
        <PostAnimalForm onChangeHandler={this.onChangeHandler} onClickHandler={this.onClickHandler} />
      </div>
    );
  }
})

export default PostAnimalContainer;
