import { ACTIONS } from './actions';
import { Review } from './types';

type State = {
  readonly reviews: Review[];
}

const initialState: State = {
  reviews: [],
};

function review(
  state: State | undefined = initialState,
  action: ACTIONS,
): State {
  switch (action.type) {
    case 'SET_REVIEWS':
      const reviews = action.data;
      return {
        reviews,
      }
    default:
      return state
  }
}

export default review;
