import { FETCH_ENTRIES } from '../actions';
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ENTRIES:
      return action.payload.data;
    default:
      return state;
  }
};
