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
import grey from '@material-ui/core/colors/grey';
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
import CertEditText from 'components/admin/cert/CertEditText';
import Paypal from 'components/Paypal';
import Signup from 'components/Signup';
import PasswordReset from 'components/PasswordReset';
import NoticeIndex from 'components/admin/notice';
import { NoticesProvider } from 'hooks/Notices';
import NoticeNew from 'components/admin/notice/NoticeNew';
import NoticeEdit from 'components/admin/notice/NoticeEdit';
import NoticeList from 'components/Notice';
import { MyNoticesProvider } from 'hooks/MyNotices';
import { StoriesProvider } from 'hooks/Stories';
import Example from 'components/Test';
import PrivacyPolicy from 'components/Statics/PrivacyPolicy';
import TermsOfBetme from 'components/Statics/TermsOfBetme';
import TermsOfChallege from 'components/Statics/TermsOfChallenge';
import Commercial from 'components/Statics/Commercial';
import EmailReset from 'components/EmailReset';
import ContactPage from 'components/ContactPage';
import StoryIndex from 'components/admin/story';
import StoryEdit from 'components/admin/story/StoryEdit';
import StoryNew from 'components/admin/story/StoryNew';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#eb3343',
      main: '#E60114',
      dark: '#a1000e',
    },
    secondary: {
      light: grey[200],
      main: grey[500],
      dark: grey[700],
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
        <StoriesProvider>
        <CertsProvider>
        <ExamsProvider>
        <EventsProvider>        
        <BooksProvider>
        <NoticesProvider>
        <MyNoticesProvider>
        <ThemeProvider theme={theme}>
          <Route exact path={paths.storynew} component={StoryNew} key='storynew' />
          <Route exact path={paths.storyedit} component={StoryEdit} key='storyedit' />
          <Route exact path={paths.storyindex} component={StoryIndex} key='storyindex' />
          <Route exact path={paths.contactpage} component={ContactPage} key='contactpage' />
          <Route exact path={paths.emailreset} component={EmailReset} key='emailreset' />
          <Route exact path={paths.commercial} component={Commercial} key='commercial' />
          <Route exact path={paths.termsofchallenge} component={TermsOfChallege} key='termsofchallenge' /> 
          <Route exact path={paths.termsofbetme} component={TermsOfBetme} key='termsofbetme' />
          <Route exact path={paths.privacypolicy} component={PrivacyPolicy} key='privacypolicy' />
          <Route exact path={paths.test} component={Example} key='example' /> 
          <Route exact path={paths.noticelist} component={NoticeList} key='noticelist' />
          <Route exact path={paths.noticeedit} component={NoticeEdit} key='noticeedit' />
          <Route exact path={paths.noticenew} component={NoticeNew} key='noticenew' /> 
          <Route exact path={paths.noticeindex} component={NoticeIndex} key='noticeindex' />
          <Route exact path={paths.paypal} component={Paypal} key='paypal' />
          <Route exact path={paths.certedittext} component={CertEditText} key='certedittext' />
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
          {/* <Route exact path={paths.addmailtoaccount} component={AddMailToAccount} key='addmail' /> */}
          <Route exact path={paths.myaccount} component={MyAccount} key='myaccount' />
          <Route exact path={paths.nopagefound} component={NoPageFound} key='nopagefound' />
          <Route exact path={paths.signin} component={Signin} key='signin' />
          <Route exact path={paths.signup} component={Signup} key='signup' />
          <Route exact path={paths.passwordreset} component={PasswordReset} key='passwordreset' />
          <Route exact path={paths.root} component={Root} key='root' />
          {/* <Route component={NoPageFound} key='nopagefound1' /> */}
        </ThemeProvider>
        </MyNoticesProvider>
        </NoticesProvider>
        </BooksProvider>  
        </EventsProvider>
        </ExamsProvider>
        </CertsProvider>
        </StoriesProvider>
        </UserProvider>
        </UsersProvider>
        </AuthProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
