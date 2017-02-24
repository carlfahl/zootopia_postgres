import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './App';
import Home from './Home';
import AnimalsContainer from './AnimalsContainer';
import PostAnimalContainer from './PostAnimalContainer';
import EditAnimalContainer from './EditAnimalContainer';
import AnimalDetail from './AnimalDetail';
import Login from './Login';
import Signup from './Signup';
import './index.css';
import $ from 'jquery';

var AppWrapper = React.createClass({
  getInitialState: function () {
    return (
      {
        user: null
      }
    )
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
  render: function () {
    return (
      <Router history={hashHistory}>
        <Route path='/' user={this.state.user} getCurrentUser={this.getCurrentUser} component={App} >
          <IndexRoute user={this.state.user} component={Home} />
          <Route path='/animals' component={AnimalsContainer} />
          <Route path='/animals/:animalID' component={AnimalDetail} />
          <Route path='/post' component={PostAnimalContainer} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/edit/:animalId' component={EditAnimalContainer} />
        </Route>
      </Router>
    );
  }
});

ReactDOM.render(
  <AppWrapper />,
  document.getElementById('root')
);
