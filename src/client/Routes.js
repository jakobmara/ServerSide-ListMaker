import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';
import ListPage from './pages/ListPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

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
        ...LoginPage,
        path: '/login'
      },
      {
        ...AdminsListPage,
        path: '/admins'
      },
      {
        ...UsersListPage,
        path: '/users'
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
