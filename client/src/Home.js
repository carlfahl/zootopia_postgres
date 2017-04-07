import React from 'react';
import { Link } from 'react-router';

var Home = function (props) {
  return (
    <div>
      <h1> Welcome to Zootopia, {props.user ? props.user : null}!</h1>
        <img src={props.auth.getUserPic()} alt='user profile pic' />
        <Link className="btn btn-primary" to={'/animals'}>View all animals</Link>
        <Link className="btn btn-primary" to={'/post'}>Add an animal</Link>
    </div>
  );
}

export default Home;
