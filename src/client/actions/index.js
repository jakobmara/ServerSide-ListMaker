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
  const res = await api.get('/current_user');
  dispatch({
    type: FETCH_CURRENT_USER,
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