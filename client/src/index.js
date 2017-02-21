import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './App';
import Home from './Home';
import AnimalsContainer from './AnimalsContainer';
import PostAnimalContainer from './PostAnimalContainer';
import EditAnimalContainer from './EditAnimalContainer';
import Login from './Login';
import Signup from './Signup';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={Home} />
      <Route path='/animals' component={AnimalsContainer} />
      <Route path='/post' component={PostAnimalContainer} />
      <Route path='/signup' component={Signup} />
      <Route path='/login' component={Login} />
      <Route path='/edit/:animalId' component={EditAnimalContainer} />
    </Route>
  </Router>,
  document.getElementById('root')
);
