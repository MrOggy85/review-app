import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { createReview, getReviews } from '../actions';

function Details() {
  let { reviewId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews());
  }, [
    dispatch,
  ]);


  const reviews = useSelector(state => state.review.reviews);
  const review = reviews.find(e => e.id === reviewId);

  const employees = useSelector(state => state.employee.employees);

  const {
    id,
    date,
    employeeId: reviewEmployeeId,
    assigneeIds: reviewAssigneeIds,
  } = review || {};

  const [employeeId, setEmployeeId] = useState(reviewEmployeeId || '');
  const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const assignableEmployees = employees.filter(x => x.id !== employeeId);

  const assignIdsRef = useRef<HTMLSelectElement>(null);

  const title = review
    ? 'View Review'
    : 'New Review';

  const onSubmit = id
    ? () => {
      // This is where updateReview should be dispatched
    }
    : () => {
      if (!employeeId) {
        setValidationError('Please Fill in missing fields');
        setIsLoading(false);
        return;
      }
      const selectedAssigners = assignIdsRef.current?.selectedOptions || [];
      const assigneeIds: string[] = [];
      for (let index = 0; index < selectedAssigners.length; index++) {
        const selectedAssigner = selectedAssigners[index];
        const assignerId = selectedAssigner.value;
        assigneeIds.push(assignerId);
      }

      dispatch(createReview({
        employeeId,
        assigneeIds,
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
          <Form.Group controlId="employeeId">
            <Form.Label>Employee</Form.Label>
            <Form.Control
              placeholder="Choose Employee"
              defaultValue={employeeId}
              onChange={(event) => {
                setValidationError('');
                setEmployeeId(event.target.value);
              }}
              as="select"
            >
              <option></option>
              {employees.map(({ id, firstname, lastname }) => (
                 <option key={id} value={id}>{`${firstname} ${lastname}`}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="assignees">
            <Form.Label>Assignees</Form.Label>
            <Form.Control
              ref={assignIdsRef}
              multiple
              placeholder="Assign Employees for Feedback"
              defaultValue={reviewAssigneeIds}
              as="select"
            >
              <option></option>
              {assignableEmployees.map(({ id, firstname, lastname }) => (
                 <option key={id} value={id}>{`${firstname} ${lastname}`}</option>
              ))}
            </Form.Control>
          </Form.Group>

          {!!id && (
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                readOnly
                type="text"
                value={date}
              />
            </Form.Group>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading || !!id}
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
