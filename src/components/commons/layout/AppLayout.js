import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Container } from '@material-ui/core';
import AppAlert from 'components/commons/atoms/AppAlert';
import paths from 'paths';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useHistory, Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TopImage from 'components/commons/layout/TopImage';
import TopTabs from './TopTabs';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { UserContext } from 'hooks/User';
import ExamNavList from '../card/ExamNavList';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { AuthContext } from "hooks/Auth";
import AdminNav from './AdminNav';
import blueGrey from '@material-ui/core/colors/blueGrey';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(18),
    backgroundColor: blueGrey[50],
  },
  footer: {
    bottom: '0',
    width: '100vw',
    textAlign: 'center',
    paddingBottom: theme.spacing(1),
  },
  atag: {
    color: '#000',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
  },
  footerbar: {
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
    borderTop: '1px solid #E60114', 
    width: '100vw',
    position: 'fixed',
    bottom: '0',
  }
}));

const AppLayout = (props) => {
  const classes = useStyles();
  const {value, setValue} = useState('');
  const [openList, setOpenList] = useState(false);
  const { user } = useContext(UserContext);
  const { currentUser } = useContext(AuthContext);
  const [adminFrag, setAdminFrag] = useState(false);

  const history = useHistory();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClick = () => {
    setOpenList(!openList);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <a
          className={classes.atag}
          href='https://wp.betme.biz'
        >
          <ListItem
            button 
            key={'Home'}
            component='li'
          >
            <ListItemText primary={'ホーム'} />
          </ListItem>
        </a>
        <a
          className={classes.atag}
          href='https://wp.betme.biz/riyou/'
        >
          <ListItem
            button 
            key={'Riyou'}
            component='li'
          >
            <ListItemText primary={'利用方法'} />
          </ListItem>
        </a>
        <a
          className={classes.atag}
          href='https://wp.betme.biz/ryoukin/'
        >
          <ListItem
            button 
            key={'Ryoukin'}
            component='li'
          >
            <ListItemText primary={'料金'} />
          </ListItem>
        </a>
        <a
          className={classes.atag}
          href='https://wp.betme.biz/posts/'
        >
          <ListItem
            button 
            key={'Posts'}
            component='li'
          >
            <ListItemText primary={'投稿'} />
          </ListItem>
        </a>
        <a
          className={classes.atag}
          href='/'
        >
          <ListItem
            button 
            key={'BetMe'}
            component='li'
          >
            <ListItemText primary={'BetMe'} />
          </ListItem>
        </a>
      </List>
      <Divider />
      <List>
        <ListItem 
          button 
          onClick={handleClick}
          key={'MyExam'}
          component='li'
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="My試験" />
            {/* {openList ? <ExpandLess /> : <ExpandMore />} */}
        </ListItem>
        {/* <Collapse in={openList} timeout="auto" unmountOnExit> */}
          <List component="div" disablePadding>
            {user.myExam && user.myExam.length && user.myExam.map(examId => (
              <ExamNavList examId={examId} />
            ))}
          </List>
        {/* </Collapse> */}
        <ListItem
          button 
          key={'MyAccount'}
          onClick={() => history.push(`${paths.myaccount}`)}
          component='li'
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={'アカウント設定'} />
        </ListItem>
        <ListItem
          button 
          key={'通知'}
          onClick={() => history.push(`${paths.noticelist}`)}
          component='li'
        >
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary={'通知'} />
        </ListItem>
        <ListItem
          button 
          key={'お問い合わせ'}
          onClick={() => history.push(`${paths.contactpage}`)}
          component='li'
        >
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary={'お問い合わせ'} />
        </ListItem>
      </List>
      <Divider />
      {currentUser && adminFrag &&
        <AdminNav />
      }
    </div>
  );

  const ScrollBottom = () => {
    const target = document.getElementById("topTarget");
    target.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div>
      <div id='topTarget' />
      <TopImage />
      <TopTabs />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <>
          <Container maxWidth="md">

            {props.children}
          </Container>
        </>
        <AppAlert />
        <footer className={classes.footer} >
          <>

            <Link
              to={`${paths.termsofbetme}`}
              target='_blank'
            >
              BetMe利用規約
            </Link>
            <br />
            <Link
              to={`${paths.termsofchallenge}`}
              target='_blank'
            >
              BetMeチャレンジ利用規約
            </Link>
            <br />
            <Link
              to={`${paths.privacypolicy}`}
              target='_blank'
            >
              プライバシーポリシー
            </Link>
            <br />
            <Link
              to={`${paths.commercial}`}
              target='_blank'
            >
              特定商取引法に基づく表示
            </Link>
          </>
          <br />
          <br />
          <>
            &copy; 2020 Signal & Company
          </>
        </footer>
        <BottomNavigation
          showLabels
          className={classes.footerbar}
        >
          <BottomNavigationAction 
            label="メニュー" 
            icon={<MenuIcon />} 
            onClick={toggleDrawer('left', true)}
          />
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
          <BottomNavigationAction 
            label="ホーム" 
            icon={<HomeIcon />} 
            onClick={() => history.push(`${paths.root}`)}
          />
          <BottomNavigationAction 
            label="トップ" 
            icon={<ArrowUpwardIcon />} 
            onClick={ScrollBottom}
          />

        </BottomNavigation>
      </main>
    </div>
  );
}

export default AppLayout;