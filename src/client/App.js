import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { fetchProfile } from './actions';
import NewNav from './components/NewNav'
const App = (props) => {
  
  return (
    <div>
      <NewNav user={props.user}/>
      {renderRoutes(props.route.routes)}
    </div>
  );
};

//this gets info from state wether the user is authenticated or not and passes it to navBar

function mapStateToProps(state){
  console.log("mapping prop: ", state)
  return {user: state.user}
}




//calls function to check if user's logged in or not
//should i make it so that loadData is passed a boolean is_authenticated and if its true to call the info to get the userName of email
function loadData(store, user){
  
  if (user){
    console.log('AUTHORIZED!')
    console.log(user.nickname);
    const val = store.dispatch(fetchProfile(user.nickname))
    return val
  }else{
    return null
  }
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchProfile })(App)
};
