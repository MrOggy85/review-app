import { combineReducers } from 'redux';
import { reducer as employeeReducer } from './employee';
import { reducer as reviewReducer } from './review';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  employee: employeeReducer,
  review: reviewReducer,
});

export default rootReducer;
