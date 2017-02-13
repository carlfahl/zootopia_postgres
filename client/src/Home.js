import React from 'react';
import {Button} from 'react-bootstrap';

var Home = function (props) {
  return (
    <div>
      <h1> Welcome to Zootopia!</h1>
        <Button bsStyle="danger" onClick={ () => props.updateActiveComponent('viewAll')}>View all animals </Button>
        <Button bsStyle="danger" onClick={ () => props.updateActiveComponent('postNew')}>Add an animal </Button>
    </div>
  );
}

export default Home;
