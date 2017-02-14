import React from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';
var PostAnimalForm = function (props) {
  return(<div>
            <Form>
              <FormGroup>
                <FormControl type='text' placeholder='Name' onChange={ (event) => props.onChangeHandler("name", event.target.value)} />
                <FormControl type='text' placeholder="Species" onChange={ (event) => props.onChangeHandler("species", event.target.value)} />
              </FormGroup>
            </Form>
            <Button bsStyle='success' onClick={ () => props.onClick()} > Add new animal </Button>
          </div>
        );
}

export default PostAnimalForm;
