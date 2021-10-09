import axios from "axios";

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users');
  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};



export const FETCH_PROFILE = 'fetch_profile';
export const fetchProfile = (user) => async (dispatch, getState, api) => { 
  console.log("fetching logged in user: ", user);
  dispatch({
    type: FETCH_PROFILE,
    payload: user
  })
}

export const LOGIN_USER = 'login_user';
export const loginUser = (name, userId) => async (dispatch, getState, api) => {
  
  const res = {
    username: name,
    id: userId
  }

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

  dispatch({
    type: FETCH_ENTRIES,
    payload: res
  });
};

export const FETCH_LIST_INFO = 'fetch_list_info';
export const fetchListInfo = (listId) => async (dispatch, getState, api) => {
  
  const res = await api.get('/getListInfo?listId=' + listId);

  dispatch({
    type: FETCH_LIST_INFO,
    payload: res
  });
};

export const FETCH_PROF_LISTS = 'fetch_prof_lists';
export const fetchProfLists = (userId) => async (dispatch, getState, api) => {
  const res = await api.get('/profPage?uname=' + userId);

  dispatch({
    type: FETCH_PROF_LISTS,
    payload: res
  });
};