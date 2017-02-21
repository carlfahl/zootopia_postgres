import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import $ from 'jquery';

var Signup = React.createClass({
  getInitialState: function () {
    return (
      {
        username: null,
        password: null
      }
    );
  },
  onChangeHandler: function (feild, val) {
    var newData = {};
    newData[feild] = val;
    this.setState(newData);
  },
  onSubmitHandler: function () {
    console.log("Submitting the form");
    const User = {
      username: this.state.username,
      password: this.state.password
    };
    $.ajax({
      url: '/signup',
      method: 'POST',
      data: User
    }).done(function (data) {
      console.log(data);
      if (data.message) {
        alert(data.message);
        window.location = "/#/signup";
      } else {
        alert("User registered.");
        window.location = '/#/';
      }
    });
  },
  render: function () {
    return (
      <div>
        <Form>
          <FormControl type="text" placeholder="username" onChange={(event) => this.onChangeHandler('username', event.target.value)} />
          <FormControl type="text" placeholder="password" onChange={(event) => this.onChangeHandler('password', event.target.value)} />
        </Form>
        <Button bsStyle="primary" onClick={() => this.onSubmitHandler()}>Add User</Button>
      </div>
    );
  }
});

export default Signup;
