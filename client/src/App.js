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
    this.setState({user: this.props.route.auth.getUser()});
  },
  setCurrentUser: function (user) {
    this.setState({user: user});
  },
  componentWillMount: function () {
    this.getCurrentUser();
  },
  renderLogin: function () {
    if (this.state.user) {
      return (
        <NavItem><Link onClick={() => {this.props.route.auth.logout(); window.location='/'}}>Logout</Link></NavItem>
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
            <NavItem>The current user is: {this.state.user ? this.state.user : "None"}</NavItem>
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
              user: this.state.user,
              auth: this.props.route.auth //sends auth instance from route to children
            })}
        </div>
      </div>
    )
  }
});

export default App;
