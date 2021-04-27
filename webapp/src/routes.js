import React, { Fragment } from 'react';
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from '@layouts';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { Login, Register, PageNotFound, Welcome, RegistrationSuccess, Chat, Options, Friends} from './containers';
import Pintar from './containers/Map/pintar.js';

const privateRoutes = [
  {
    id: 'welcome',
    path: '/welcome',
    component: Welcome
  },
  {
    id: 'map',
    path: '/map',
    component: Pintar
  },
  {
    id: 'chat',
    path: '/chat',
    component: Chat
  },
  {
    id: 'options',
    path: '/options',
    component: Options
  },
  {
    id: 'friends',
    path: '/friends',
    component: Friends
  },
  
];

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/login" exact />
        <NotLoggedInLayout component={Register} path="/register" exact />
        <NotLoggedInLayout path="/register/success" component={RegistrationSuccess} exact />
        <PublicLayout path="/404" component={PageNotFound} exact />
        <Redirect from="/" to="/welcome" exact />
        <PrivateLayout path="/" routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
