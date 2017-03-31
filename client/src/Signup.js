import React from 'react';
import { Form, FormControl, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import $ from 'jquery';

var Signup = React.createClass({
  getInitialState: function () {
    return (
      {
        username: null,
        password: null,
        message: null
      }
    );
  },
  onChangeHandler: function (feild, val) {
    var newData = {};
    newData[feild] = val;
    this.setState(newData);
  },
  onSubmitHandler: function () {
    var self = this;
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
        // alert(data.message);
        self.setState({message: data.message});
        console.log(self.state.message);
        // window.location = "/#/signup";
      } else {
        // alert("User registered.");
        self.setState({message: "User registered."});
        window.location = '/#/';
      }
    });
  },
  render: function () {
    var alertCon = <Alert bsStyle="danger"> { this.state.message } </Alert>;
    return (
      <div>
        {this.state.message? alertCon : null}
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
