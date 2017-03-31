import React from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';

var SearchForm = React.createClass({
  render: function() {
    return (
      <div>
        <Form>
          <FormControl type='text'
            placeholder='search'
            onChange={(event) => this.props.onChangeHandler('searchText', event.target.value)} />
        </Form>
        <Button bsStyle="primary" onClick={() => this.props.searchComments()}>Search</Button>
      </div>
    );
  }
});

export default SearchForm;
