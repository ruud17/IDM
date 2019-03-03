import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});


class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
