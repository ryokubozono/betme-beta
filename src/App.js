import React from 'react';
import 'App.css';
import 'fontsource-roboto';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import paths from 'paths';
import NoPageFound from 'components/NoPageFound';
import Root from 'components/Root';
import Signin from 'components/Signin';
import Signup from 'components/Signup';
import PasswordReset from 'components/PasswordReset';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import { AuthProvider } from 'hooks/Auth';

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
    // plane: '#fff',
    matcha: '#69f0ae',
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
          <Route exact path={paths.nopagefound} component={NoPageFound} key='nopagefound' />
          <Route exact path={paths.signin} component={Signin} key='signin' />
          <Route exact path={paths.signup} component={Signup} key='signup' />
          <Route exact path={paths.passwordreset} component={PasswordReset} kry='passwordreset' />
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
