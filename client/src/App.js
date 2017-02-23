import React from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import $ from 'jquery';

var App = React.createClass({
  getInitialState: function () {
    return (
      {
        user: null
      }
    );
  },
  getCurrentUser: function () {
    var self = this;
    $.ajax({
      url: '/getCurrentUser',
      method: 'GET'
    }).done(function (data) {
      self.setState({user: data});
      console.log(data);
    });
  },
  // setCurrentUser: function (user) {
    // this.setState({user: user});
  // },
  componentWillMount: function () {
    this.getCurrentUser();
  },
  render: function () {
    return(
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Zootopia</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <span>The current user is: {this.state.user && this.state.user.local ? this.state.user.local.username : null}</span>
            <NavItem><Link to={'/'}>Home</Link></NavItem>
            <NavItem><Link to={'/signup'}>Signup</Link></NavItem>}
            <NavItem><Link to={'/login'}>Login</Link></NavItem>}
            <NavItem><Link to={'/logout'}>Logout</Link></NavItem>
            <NavItem><Link to={'/animals'}>Show All Animals</Link></NavItem>
            <NavItem><Link to={'/post'}>Add an Animal</Link></NavItem>
          </Nav>
        </Navbar>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
});


export default App;
