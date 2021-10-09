import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';import axios from 'axios';
import HomePage from './client/pages/HomePage';

const API_URL = 'https://list-maker-api.herokuapp.com'

const app = express();

app.use('/api',proxy(API_URL, {
  proxyReqOptDecorator(opts){
      return opts;
  }//this is just for the current API (won't need to do this for my project) (make sure dont run into security errors with google auth)
}));

//users contains all the users within DB 
let users = []
axios.get('https://list-maker-api.herokuapp.com/getUsers')
.then(response => {
    console.log(response.data);
    users = response.data.users
}).catch(error => {
    console.log("PError: ", error);
});

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'f374b9f12d759ede0225baf118d1069d59116c299a95b9038d82ef77d1e48d58',
  baseURL: 'http://localhost:3000',
  clientID: '3vLG3v0eddwZIPP22BYBNNmPKWgcf6IW',
  issuerBaseURL: 'https://dev-zc9k6qt8.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req,res) => {
  console.log("USERS in dir home:",users)

  if (req.oidc.user){
    console.log("SIGNED IN DIR home", req.oidc.user.nickname);
  }

  if (req.oidc.isAuthenticated()){
    if (!users.includes(req.oidc.user.nickname)){
      console.log('calling signup')
      axios.post(API_URL +'/signUp', {
        userName: req.oidc.user.nickname  
      })
    }
  }
  const store = createStore(req);  

  
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      if (route.loadData) {
        const params = req.path.split('/');
        if (req.oidc.user){
          return route.loadData(store, req.oidc.user.nickname, params[2])
        }
        return route.loadData(store, params[2])
      }else{
        return null
      }
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {params: req.params};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});





app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = createStore(req);  
  console.log("USERS:",users)
  if (req.oidc.user){
    console.log("SIGNED IN", req.oidc.user.nickname);
  }
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      if (route.loadData) {
        const params = req.path.split('/');
        console.log('my params are: ', params)        
        if (req.oidc.user){
          return route.loadData(store, req.oidc.user.nickname, params[2])
        }
        return route.loadData(store, null, params[2])      //had to add null cuz navigating from exlpore -> list it would think that params[2] (listId) was user
      }
      else{
        return null
      }
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {params: req.params};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
