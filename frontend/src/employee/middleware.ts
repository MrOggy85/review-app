import { Middleware, MiddlewareAPI } from 'redux';
import axios from 'axios';
import { ACTIONS } from '../store/types';
import { setEmployees, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from './actions';

const customMiddleware: Middleware = store => next => async (action: ACTIONS) => {
  switch (action.type) {
    case 'GET_EMPLOYEES':
      getEmployees(store);
      break;

    case 'CREATE_EMPLOYEE':
      createEmployee(store, action.data);
      break;

    case 'UPDATE_EMPLOYEE':
      updateEmployee(store, action.data);
      break;

    case 'DELETE_EMPLOYEE':
      deleteEmployee(store, action.id);
      break;

    default:
      break;
  }

  next(action);
}

async function getEmployees(store: MiddlewareAPI) {
  const result = await axios.get('http://localhost:5000/employee');

  store.dispatch(setEmployees(result.data));
}

async function createEmployee(store: MiddlewareAPI, data: CREATE_EMPLOYEE['data']) {
  await axios.post('http://localhost:5000/employee', data);

  window.location.replace('/employee');
}

async function updateEmployee(store: MiddlewareAPI, data: UPDATE_EMPLOYEE['data']) {
  await axios.put('http://localhost:5000/employee', data);

  window.location.replace('/employee');
}

async function deleteEmployee(store: MiddlewareAPI, id: DELETE_EMPLOYEE['id']) {
  await axios.delete(`http://localhost:5000/employee/${id}`);

  window.location.replace('/employee');
}

export default customMiddleware;
