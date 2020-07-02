import { Action } from 'redux';
import { Review } from './types';

type GET_REVIEWS = 'GET_REVIEWS';

type SET_REVIEWS = {
  type: 'SET_REVIEWS';
  data: any;
}

export type CREATE_REVIEW = {
  type: 'CREATE_REVIEW';
  data: NewReview;
}

export type UPDATE_REVIEW = {
  type: 'UPDATE_REVIEW';
  data: Review;
}

export type DELETE_REVIEW = {
  type: 'DELETE_REVIEW';
  id: Review['id'];
}

export function getReviews(): Action<GET_REVIEWS> {
  return {
    type: 'GET_REVIEWS',
  };
}

export function setReviews(data: any): SET_REVIEWS {
  return {
    type: 'SET_REVIEWS',
    data,
  };
}

type NewReview = Pick<Review, 'employeeId' | 'assigneeIds'>;

export function createReview(data: NewReview): CREATE_REVIEW {
  return {
    type: 'CREATE_REVIEW',
    data,
  };
}

export function updateReview(data: Review): UPDATE_REVIEW {
  return {
    type: 'UPDATE_REVIEW',
    data,
  };
}

export function deleteReview(id: Review['id']): DELETE_REVIEW {
  return {
    type: 'DELETE_REVIEW',
    id,
  };
}

export type ACTIONS =
  ReturnType<typeof getReviews> |
  ReturnType<typeof createReview> |
  ReturnType<typeof updateReview> |
  ReturnType<typeof deleteReview> |
  ReturnType<typeof setReviews>;
