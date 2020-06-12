import React from 'react';
import 'App.css';
import 'fontsource-roboto';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import paths from 'paths';
import NoPageFound from 'components/NoPageFound';
import Root from 'components/Root';
import Signin from 'components/Signin';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import { AuthProvider } from 'hooks/Auth';
import indigo from '@material-ui/core/colors/indigo';
import MyAccount from 'components/MyAccount';
import AddMailToAccount from 'components/MyAccount/AddMailToAccount';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: green['A100'],
      main: green['A200'],
      dark: green['A400'],
    },
    secondary: {
      light: pink[100],
      main: pink[200],
      dark: pink[300],
    },
    info: {
      light: indigo[700],
      main: indigo[800],
      dark: indigo[900],
    },
  },
  status: {
    danger: 'orange',
  },
});

function App() {
  return (
    <>
      <Router>
        <Switch>
        <AuthProvider>
        <ThemeProvider theme={theme}>
          <Route exact path={paths.addmailtoaccount} component={AddMailToAccount} key='addmail' />
          <Route exact path={paths.myaccount} component={MyAccount} key='myaccount' />
          <Route exact path={paths.nopagefound} component={NoPageFound} key='nopagefound' />
          <Route exact path={paths.signin} component={Signin} key='signin' />
          <Route exact path={paths.root} component={Root} key='root' />
          {/* <Route component={NoPageFound} key='nopagefound1' /> */}
        </ThemeProvider>
        </AuthProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
