import React, { useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, deleteEmployee } from '../actions';
import { Link } from 'react-router-dom';

function List() {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, [
    dispatch,
  ]);

  return (
    <Container style={{
      marginTop: '20px',
    }}>
      <h2>Employee List</h2>

      <div>
        <Link to="/employee/new" >
          <Button
            variant="primary"
            type="button"
            style={{
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            New Employee
          </Button>
        </Link>
        <Button
          variant="info"
          type="button"
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: '20px',
          }}
          onClick={() => dispatch(getEmployees())}
        >
          Refresh
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {/* <th>#</th> */}
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(({ id, firstname, lastname }) => (
            <tr key={id}>
              <td width={120}>
                <Link
                  to={`/employee/${id}`}
                  style={{
                    marginRight: '5px',
                  }}
                >
                  <Button>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Link>
                <Button onClick={() => dispatch(deleteEmployee(id))}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </td>
              {/* <td><FontAwesomeIcon icon={faTrashAlt} /></td> */}
              {/* <td>{id}</td> */}
              <td>{firstname}</td>
              <td>{lastname}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
