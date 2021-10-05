import { FETCH_PROF_LISTS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PROF_LISTS:
      return action.payload.data;
    default:
      return state;
  }
};
