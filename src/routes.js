import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Users = React.lazy(() => import('./views/Users'));
const Roles = React.lazy(() => import('./views/Roles'));
const Groups = React.lazy(() => import('./views/Groups'));


const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/users', name: 'Users', component: Users },
  { path: '/roles', name: 'Roles', component: Roles },
  { path: '/groups', name: 'Groups', component: Groups },
];

export default routes;
