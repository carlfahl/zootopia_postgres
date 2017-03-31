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
        // username is comming from props
        //user: null,
        message: null,
        messageStyle: null
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
      console.log("Done with login AJAX.");
      console.log(data);
      if (data.local) {
        // alert("User logged in");
        self.setState({message: "User Logged in", messageStyle: "success"});
        self.props.setCurrentUser(data);
        console.log(data);
        setTimeout(function () {
          window.location = "/#/";
        }, 1500);
      } else {
        self.setState(data)
        self.setState({messageStyle: "danger"});
      }
    });
  },
  render: function () {
    var alertCon = <Alert bsStyle={this.state.messageStyle}> { this.state.message } </Alert>;
    return (
      <div>
        {this.state.message? alertCon : null}
        <Form>
          <FormControl type="text" placeholder="username" onChange={(event) => this.onChangeHandler('username', event.target.value)} />
          <FormControl type="text" placeholder="password" onChange={(event) => this.onChangeHandler('password', event.target.value)} />
        </Form>
        <Button bsStyle="primary" onClick={() => this.onSubmitHandler()}>Login</Button>
      </div>
    );
  }
});

export default Login;
