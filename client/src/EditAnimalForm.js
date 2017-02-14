import React from 'react';
import {Form, FormControl, FormGroup, Button} from 'react-bootstrap';

var EditAnimalForm = function (props) {
  return (
    <div>
      <Form>
        <FormGroup>
          <FormControl type='text' placeholder='name' value={props.animalName} onChange={ (event) => props.onChangeHandler('name', event.target.value)} />
          <FormControl type='text' placeholder='species' value={props.animalSpecies} onChange={ (event) => props.onChangeHandler('species', event.target.value)} />
        </FormGroup>
      </Form>
      <Button bsStyle='success' onClick={ () => props.onClickHandler()}> Update animal </Button>
    </div>
  );
}

export default EditAnimalForm;
