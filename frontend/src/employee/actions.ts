import { Action } from 'redux';
import { Employee } from './types';

type GET_EMPLOYEES = 'GET_EMPLOYEES';
// type SET_EMPLOYEES = 'SET_EMPLOYEES';
// const SET_EMPLOYEES = 'SET_EMPLOYEES';

type SET_EMPLOYEES = {
  type: 'SET_EMPLOYEES';
  data: any;
}

export type CREATE_EMPLOYEE = {
  type: 'CREATE_EMPLOYEE';
  data: NewEmployee;
}

export type UPDATE_EMPLOYEE = {
  type: 'UPDATE_EMPLOYEE';
  data: Employee;
}

export type DELETE_EMPLOYEE = {
  type: 'DELETE_EMPLOYEE';
  id: Employee['id'];
}

export function getEmployees(): Action<GET_EMPLOYEES> {
  return {
    type: 'GET_EMPLOYEES',
  };
}

export function setEmployees(data: any): SET_EMPLOYEES {
  return {
    type: 'SET_EMPLOYEES',
    data,
  };
}

type NewEmployee = Omit<Employee, 'id'>;

export function createEmployee(data: NewEmployee): CREATE_EMPLOYEE {
  return {
    type: 'CREATE_EMPLOYEE',
    data,
  };
}

export function updateEmployee(data: Employee): UPDATE_EMPLOYEE {
  return {
    type: 'UPDATE_EMPLOYEE',
    data,
  };
}

export function deleteEmployee(id: Employee['id']): DELETE_EMPLOYEE {
  return {
    type: 'DELETE_EMPLOYEE',
    id,
  };
}

export type ACTIONS =
  ReturnType<typeof getEmployees> |
  ReturnType<typeof createEmployee> |
  ReturnType<typeof updateEmployee> |
  ReturnType<typeof deleteEmployee> |
  ReturnType<typeof setEmployees>;
