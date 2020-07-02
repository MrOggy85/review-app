import React, { useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../actions';
import { Link } from 'react-router-dom';

function List() {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review.reviews);
  const employees = useSelector(state => state.employee.employees);

  useEffect(() => {
    dispatch(getReviews());
  }, [
    dispatch,
  ]);

  return (
    <Container style={{
      marginTop: '20px',
    }}>
      <h2>Review List</h2>

      <div>
        <Link to="/review/new" >
          <Button
            variant="primary"
            type="button"
            style={{
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            New Review
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
          onClick={() => dispatch(getReviews())}
        >
          Refresh
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {/* <th>#</th> */}
            <th>Date</th>
            <th>Employee</th>
            <th>Finished</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(({ id, date, employeeId, submitted }) => {
            const employee = employees.find(e => e.id === employeeId);
            return (
            <tr key={id}>
              <td width={120}>
                <Link
                  to={`/review/${id}`}
                  style={{
                    marginRight: '5px',
                  }}
                >
                  <Button>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Link>
              </td>
              {/* <td><FontAwesomeIcon icon={faTrashAlt} /></td> */}
              <td>{new Date(date).toLocaleString()}</td>
              <td>{`${employee?.firstname} ${employee?.lastname}`}</td>
              <td>
                {submitted
                  ? 'YES'
                  : 'NO'
                }
              </td>
            </tr>
          )})}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
