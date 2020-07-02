import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { createEmployee, updateEmployee, getEmployees } from '../actions';

function Details() {
  let { employeeId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [
    dispatch,
  ]);

  const employees = useSelector(state => state.employee.employees);
  const employee = employees.find(e => e.id === employeeId);

  const {
    id,
    firstname: employeeFirstname,
    lastname: employeeLastname,
  } = employee || {};

  const [firstname, setFirstname] = useState(employeeFirstname || '');
  const [lastname, setLastname] = useState(employeeLastname || '');
  const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const title = employee
    ? 'Edit Employee'
    : 'New Employee';

  const onSubmit = id
    ? () => {
      if (!firstname || !lastname) {
        setValidationError('Please Fill in missing fields');
        setIsLoading(false);
        return;
      }
      dispatch(updateEmployee({
        id,
        firstname,
        lastname,
      }));
    }
    : () => {
      if (!firstname || !lastname) {
        setValidationError('Please Fill in missing fields');
        setIsLoading(false);
        return;
      }
      dispatch(createEmployee({
        firstname,
        lastname,
      }));
    };

  return (
    <Container style={{
      marginTop: '20px',
    }}>
      <h2>{title}</h2>

      {validationError && (
        <Alert variant="danger">
          {validationError}
        </Alert>
      )}


        <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          setIsLoading(true);

          onSubmit();
        }}>
          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              defaultValue={firstname}
              onChange={(event) => {
                setValidationError('');
                setFirstname(event.target.value)
              }}
            />
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              defaultValue={lastname}
              onChange={(event) => {
                setValidationError('');
                setLastname(event.target.value)
              }}
            />
          </Form.Group>

          <input type="hidden" defaultValue={id} />

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading
            ? 'Please Wait...'
            : 'Submit'}
          </Button>
        </Form>
      </Container>
  );
}

export default Details;
