import React from 'react';
import { Form, FormControl, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import $ from 'jquery';

var Login = React.createClass({
  getInitialState: function () {
    return (
      {
        username: null,
        password: null,
        user: null,
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
      url: '/login',
      method: 'POST',
      data: User
    }).done(function (data) {
      console.log(data);
      if (data.local) {
        alert("User logged in");
        self.setState({user: data});
        console.log(data);
        window.location = "/#/";
      } else {
        if (data.message) {
          alert(data.message);
        }
        alert("Wrong username or password");
        self.setState({message: "Wrong username or password."});
        // window.location = '/#/';
      }
    });
  },
  render: function () {
    var alertCon = <Alert bsStyle="danger"> { this.state.meassage } </Alert>;
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

export default Login;
