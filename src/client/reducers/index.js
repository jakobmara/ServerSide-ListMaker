import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import entriesReducer from './entriesReducer';
import ListInfoReducer from './ListInfoReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
  admins: adminsReducer,
  entries: entriesReducer,
  listInfo: ListInfoReducer,
  profLists: profileReducer
});
