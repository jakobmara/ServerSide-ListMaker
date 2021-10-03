import { FETCH_LIST_INFO } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_LIST_INFO:
      return action.payload.data;
    default:
      return state;
  }
};
