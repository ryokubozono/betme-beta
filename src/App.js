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
import { CertsProvider } from 'hooks/Certs';
import { ExamsProvider } from 'hooks/Exams';
import { UsersProvider } from 'hooks/Users';
import { UserProvider } from 'hooks/User';
import { BooksProvider } from 'hooks/Books';
import CertDetail from 'components/cert/CertDetail';
import { EventsProvider } from 'hooks/Events';
import CertIndex from 'components/admin/cert';
import CertEdit from 'components/admin/cert/CertEdit';
import CertNew from 'components/admin/cert/CertNew';
import ExamIndex from 'components/admin/exam';
import ExamEdit from 'components/admin/exam/ExamEdit';
import ExamNew from 'components/admin/exam/ExamNew';
import BookIndex from 'components/admin/book';
import BookNew from 'components/admin/book/BookNew';
import BookEdit from 'components/admin/book/BookEdit';
import UserIndex from 'components/admin/user';
import UserEdit from 'components/admin/user/UserEdit';

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
        <UsersProvider>
        <UserProvider>
        <CertsProvider>
        <ExamsProvider>
        <EventsProvider>        
        <BooksProvider>        
        <ThemeProvider theme={theme}>
          <Route exact path={paths.useredit} component={UserEdit} key='useredit' />
          <Route exact path={paths.userindex} component={UserIndex} key='userindex' />
          <Route exact path={paths.bookedit} component={BookEdit} key='bookedit' />
          <Route exact path={paths.booknew} component={BookNew} key='booknew' />
          <Route exact path={paths.bookindex} component={BookIndex} key='bookindex' />
          <Route exact path={paths.examnew} component={ExamNew} key='examnew' />
          <Route exact path={paths.examedit} component={ExamEdit} key='examedit' />
          <Route exact path={paths.examindex} component={ExamIndex} key='examindex' />
          <Route exact path={paths.certnew} component={CertNew} key='certnew' />
          <Route exact path={paths.certedit} component={CertEdit} key='certedit' />
          <Route exact path={paths.certindex} component={CertIndex} key='certindex' />
          <Route exact path={paths.certdetail} component={CertDetail} key='certdetail' />
          <Route exact path={paths.addmailtoaccount} component={AddMailToAccount} key='addmail' />
          <Route exact path={paths.myaccount} component={MyAccount} key='myaccount' />
          <Route exact path={paths.nopagefound} component={NoPageFound} key='nopagefound' />
          <Route exact path={paths.signin} component={Signin} key='signin' />
          <Route exact path={paths.root} component={Root} key='root' />
          {/* <Route component={NoPageFound} key='nopagefound1' /> */}
        </ThemeProvider>
        </BooksProvider>  
        </EventsProvider>
        </ExamsProvider>
        </CertsProvider>
        </UserProvider>
        </UsersProvider>
        </AuthProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
