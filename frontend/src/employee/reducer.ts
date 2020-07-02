import { ACTIONS } from './actions';
import { Employee } from './types';

type State = {
  readonly employees: Employee[];
}

const initialState: State = {
  employees: [],
};

function employee(
  state: State | undefined = initialState,
  action: ACTIONS,
): State {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      const employees = action.data;
      return {
        employees,
      }
    default:
      return state
  }
}

export default employee;
