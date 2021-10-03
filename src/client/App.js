import React from 'react';
import { renderRoutes } from 'react-router-config';
import { fetchCurrentUser } from './actions';
import NewNav from './components/NewNav'
const App = ({ route }) => {
  return (
    <div>
      <NewNav />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App,
};
