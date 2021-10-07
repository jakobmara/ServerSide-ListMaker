import { combineReducers } from 'redux';
import entriesReducer from './entriesReducer';
import ListInfoReducer from './ListInfoReducer';
import profileReducer from './profileReducer';
import userReducer from './userReducer';

export default combineReducers({
  entries: entriesReducer,
  listInfo: ListInfoReducer,
  profLists: profileReducer,
  user: userReducer
});
