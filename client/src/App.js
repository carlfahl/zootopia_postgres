import React from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, Nav, Alert } from 'react-bootstrap';
import $ from 'jquery';

var App = React.createClass({
  getInitialState: function () {
    return (
      {
        user: null,
        username: null,
        message: null,
        messageStyle: "danger"
      }
    );
  },
  getCurrentUser: function () {
    console.log("Running the getCurrentUser function.")
    $.ajax({
      url: '/getCurrentUser',
      method: 'GET'
    }).done((data) => {
      if (data.user !== null) {
        console.log(data);
        this.setState({user: data, username: data.local.username});
        console.log(this.state.user);
      } else {
        this.setState(data);
      }
    });
  },
  setCurrentUser: function (user) {
    this.setState({user: user});
  },
  componentWillMount: function () {
    this.getCurrentUser();
  },
  componentWillUpdate: function (nextProps, nextState) {

  },
  logoutUser: function () {
    $.ajax({
      url: '/logout',
      method: 'GET'
    }).done((data) => {
      this.setState(data);
    });
    setTimeout(() => {
      this.setState({user: null, message: null});
      window.location = '/#/'
    }, 1500);
  },
  renderLogin: function () {
    if (this.state.user) {
      return (
        <NavItem><Link onClick={(event) => this.logoutUser(event)}>Logout</Link></NavItem>
      );
    } else {
      return (
        <NavItem><Link to={'/login'}>Login</Link></NavItem>
      );
    }
  },
  render: function () {
    var alertCon = <Alert bsStyle={this.state.messageStyle}> { this.state.message } </Alert>;
    return(
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Zootopia</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem>The current user is: {this.state.user && this.state.user.local ? this.state.user.local.username : "None"}</NavItem>
            <NavItem><Link to={'/'}>Home</Link></NavItem>
            <NavItem><Link to={'/animals'}>Show All Animals</Link></NavItem>
            <NavItem><Link to={'/post'}>Add an Animal</Link></NavItem>
            <NavItem><Link to={'/signup'}>Signup</Link></NavItem>
            {this.renderLogin()}
          </Nav>
        </Navbar>
        <div>
          {this.state.message? alertCon : null}
          {this.props.children && React.cloneElement(this.props.children,
            {
              setCurrentUser: this.setCurrentUser,
              getCurrentUser: this.getCurrentUser,
              user: this.state.user
            })}
        </div>
      </div>
    )
  }
});

export default App;
