import React from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';

var NewCommentForm = function (props) {
  return(<div>
            <Form>
              <FormGroup>
                <FormControl type='text' placeholder='Title' onChange={ (event) => props.onChangeHandler('newCommentTitle', event.target.value)} />
                <FormControl type='text' placeholder='Comment' onChange={ (event) => props.onChangeHandler('newCommentText', event.target.value)} />
              </FormGroup>
            </Form>
            <Button bsStyle='success' onClick={ (event) => props.onSubmitHandler(event)} > Add a comment </Button>
          </div>
        );
};

export default NewCommentForm;
