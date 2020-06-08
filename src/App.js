import React from 'react';
import 'App.css';
import 'fontsource-roboto';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import paths from 'paths';
import NoPageFound from 'components/NoPageFound';
import Root from 'components/Root';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={paths.nopagefound} component={NoPageFound} key='nopagefound' />
          <Route path={paths.root} component={Root} key='root' />
        </Switch>
      </Router>
    </>
  );
}

export default App;
