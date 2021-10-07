import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users');
  console.log("res for fetching users: ", res);
  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = {
    userId: cookies.get('userId'),
    username: cookies.get('username')
  };

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const FETCH_PROFILE = 'fetch_profile';
export const fetchProfile = (user) => async (dispatch, getState, api) => { 
  console.log(`SET user DATA!!!: `, user);

  dispatch({
    type: FETCH_PROFILE,
    payload: user
  })
}

export const LOGIN_USER = 'login_user';
export const loginUser = (name, userId) => async (dispatch, getState, api) => {
  console.log("in loginUser action")
  
  const res = {
    username: name,
    id: userId
  }
  console.log('res is: ', res);
  dispatch({
    type: LOGIN_USER,
    payload: res
  });
};



export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');

  dispatch({
    type: FETCH_ADMINS,
    payload: res
  });
};

export const FETCH_ENTRIES = 'fetch_entries';
export const fetchEntries = (listId) => async (dispatch, getState, api) => {
  const res = await api.get('/getListEntries?listId=' + listId);
  //console.log("new res for fetch: ", res);

  dispatch({
    type: FETCH_ENTRIES,
    payload: res
  });
};

export const FETCH_LIST_INFO = 'fetch_list_info';
export const fetchListInfo = (listId) => async (dispatch, getState, api) => {
  
  console.log("passed: ", listId);
  const res = await api.get('/getListInfo?listId=' + listId);

  dispatch({
    type: FETCH_LIST_INFO,
    payload: res
  });
};

export const FETCH_PROF_LISTS = 'fetch_prof_lists';
export const fetchProfLists = (userId) => async (dispatch, getState, api) => {
  const res = await api.get('/userPage?userId=' + userId);

  dispatch({
    type: FETCH_PROF_LISTS,
    payload: res
  });
};