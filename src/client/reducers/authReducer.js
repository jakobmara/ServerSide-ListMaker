import { LOGIN_USER } from '../actions';

export default function(state = null, action) {

  switch (action.type) {
    case LOGIN_USER:
      return action.payload.data || false;
    default:
      return state;
  }
}
