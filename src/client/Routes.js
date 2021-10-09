import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ListPage from './pages/ListPage';
import ProfilePage from './pages/ProfilePage';
import ExplorePage from './pages/ExplorePage';
export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...ListPage,
        path: '/list/:id',
        exact: true
      },
      {
        ...ProfilePage,
        path: '/mylists/:id',
        exact: true
      },
      {
        ...ExplorePage,
        path: '/explore',
        exact: true
      },
      {
        ...NotFoundPage
      }
    ]
  }
];