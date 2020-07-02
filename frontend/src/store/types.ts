import { ACTIONS as EMPLOYEE_ACTIONS } from '../employee/actions';
import { ACTIONS as REVIEW_ACTIONS } from '../review/actions';

export type ACTIONS =
  EMPLOYEE_ACTIONS |
  REVIEW_ACTIONS;
