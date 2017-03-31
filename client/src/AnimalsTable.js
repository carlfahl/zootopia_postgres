import React from 'react';
import { Link } from 'react-router';
import {Table, Form, FormControl, Button, Checkbox} from 'react-bootstrap';


var AnimalsTable = function (props) {
  var Animals = props.animals.map(function (item) {
    return (<tr><td>{item.name}</td><td>{item.species}</td>
                <td><Button bsStyle='danger' onClick={ () => props.deleteHandler(item._id)}>Delete</Button>
                <Link to={'/edit/' + item._id} className='btn btn-primary'>Update</Link>
                <Link to={'/animals/' + item._id} className='btn btn-danger'>Details</Link></td>
            </tr>);
  });
  return (
    <div>
      <h1> Animals of Zootopia </h1>
      <Form inline>
        <FormControl type='text'
          placeholder='limit'
          onChange={(e) => props.onChangeHandler('limit', e.target.value)}
        />
        <Checkbox
          onChange={(e) => props.onChangeHandler('sort', e.target.checked)}>
          Sort by Name
        </Checkbox>
        <Checkbox
          onChange={(e) => props.onChangeHandler('select', e.target.checked)}>
          Select only name
        </Checkbox>
      </Form>
      <Button bsStyle='primary' onClick={() => props.onClickHandler()}>Limit Result</Button>
      <Table  hover>
        <thead>
          <tr>
            <th> Name </th>
            <th> Species </th>
          </tr>
        </thead>
        <tbody>
          {Animals}
        </tbody>
      </Table>
    </div>
  );
}
export default AnimalsTable;
