import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use('/api',proxy('https://list-maker-api.herokuapp.com', {
  proxyReqOptDecorator(opts){
      return opts;
  }//this is just for the current API (won't need to do this for my project) (make sure dont run into security errors with google auth)
}));
//return route.loadData ? route.loadData(store) : null; for testing purposes I expanded it


app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      if (route.loadData) {
        const params = req.path.split('/');
        console.log('my params are: ', params)
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

    console.log('contextis: ', context);
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
