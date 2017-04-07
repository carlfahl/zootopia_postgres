import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';
import AnimalsContainer from './AnimalsContainer';
import AuthService from './AuthService';
import PostAnimalContainer from './PostAnimalContainer';
import EditAnimalContainer from './EditAnimalContainer';
import AnimalDetail from './AnimalDetail';
import Login from './Login';
import Signup from './Signup';
import './index.css';
import $ from 'jquery';

const auth = new AuthService('SFACxhfQYga0K03ggbncdtj91U4sj9mz', 'carlfahl.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

var AppWrapper = React.createClass({
  render: function () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App} auth={auth}>
          <IndexRoute component={Home} onEnter={requireAuth}/>
          <Route path='/animals' component={AnimalsContainer} onEnter={requireAuth}/>
          <Route path='/animals/:animalId' component={AnimalDetail} onEnter={requireAuth}/>
          <Route path='/post' component={PostAnimalContainer} onEnter={requireAuth}/>
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/edit/:animalId' component={EditAnimalContainer} onEnter={requireAuth}/>
        </Route>
      </Router>
    );
  }
});

ReactDOM.render(
  <AppWrapper />,
  document.getElementById('root')
);
