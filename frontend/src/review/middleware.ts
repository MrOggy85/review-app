import { Middleware, MiddlewareAPI } from 'redux';
import axios from 'axios';
import { ACTIONS } from '../store/types';
import { setReviews, CREATE_REVIEW, DELETE_REVIEW } from './actions';
import { setEmployees } from '../employee/actions';

const customMiddleware: Middleware = store => next => async (action: ACTIONS) => {
  switch (action.type) {
    case 'GET_REVIEWS':
      getReviews(store);
      break;

    case 'CREATE_REVIEW':
      createReview(store, action.data);
      break;

    case 'DELETE_REVIEW':
      deleteReview(store, action.id);
      break;

    default:
      break;
  }

  next(action);
}

async function getReviews(store: MiddlewareAPI) {
  const resultReview = await axios.get('http://localhost:5000/review');
  const resultEmployee = await axios.get('http://localhost:5000/employee');

  store.dispatch(setEmployees(resultEmployee.data));
  store.dispatch(setReviews(resultReview.data));
}

async function createReview(store: MiddlewareAPI, data: CREATE_REVIEW['data']) {
  await axios.post('http://localhost:5000/review', data);

  window.location.replace('/review');
}

async function deleteReview(store: MiddlewareAPI, id: DELETE_REVIEW['id']) {
  await axios.delete(`http://localhost:5000/review/${id}`);

  window.location.replace('/review');
}

export default customMiddleware;
