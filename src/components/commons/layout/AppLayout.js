import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { Container, Menu, MenuItem, Badge } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppAlert from 'components/commons/atoms/AppAlert';
import { AuthContext } from "hooks/Auth";
import { auth } from "FirebaseConfig";
import { useHistory } from 'react-router-dom';
import paths from 'paths';
import { UserContext } from 'hooks/User';
import ExamNavList from '../card/ExamNavList';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AdminNav from './AdminNav';
import BetMeLogo from 'assets/betme_logo_02.png';
import { MyNoticesContext } from 'hooks/MyNotices';
import AppLogin from './AppLogin';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: grey[50],
    color: grey[900],
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    
    backgroundColor: blueGrey[50],
    minHeight: '100vh',
  },
  menuButtonRight: {
    position: 'absolute',
    right: 0,
  },
  footer: {
    position: 'absolute',
    bottom: '0',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
    textAlign: 'center',
    // borderTop: '1px solid #ccc'
  },
  cursorPointer:{
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#eee',
    },
  },
}));

const AppLayout = (props) => {

  const { currentUser } = useContext(AuthContext);
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [openList, setOpenList] = useState(false);
  const [adminFrag, setAdminFrag] = useState(false);
  const [countNotice, setCountNotice] = useState(0);
  const { myNotices } = useContext(MyNoticesContext);
  const [ nickName, setNickName ] = useState('');

  useEffect(() => {
    if (user) {
      if (user.admin) {
        setAdminFrag(true)
      } else {
        setAdminFrag(false)
      }
      setNickName(user.nickName)
    }
  }, [user])

  const handleSignout = () => {
    // console.log('click logout')
    // logout button
    // すぐにログアウトしないため/loginに遷移させることができない。
    auth.signOut()
    .then(() => {
      history.push({
        pathname: '/',
        state: {
          text: 'ログアウトしました',
          type: 'success',
        }
      })
    })
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpenList(!openList);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button 
          key={'Home'}
          onClick={() => history.push(`${paths.root}`)}
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={'ホーム'} />
        </ListItem>
        <ListItem 
          button 
          onClick={handleClick}
          key={'MyExam'}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="受験する資格試験" />
            {openList ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {user.myExam && user.myExam.length && user.myExam.map(examId => (
              <ExamNavList examId={examId} />
            ))}
          </List>
        </Collapse>
        <ListItem
          button 
          key={'MyAccount'}
          onClick={() => history.push(`${paths.myaccount}`)}
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
        >
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary={'通知'} />
        </ListItem>
      </List>
      <Divider />
      {currentUser && adminFrag &&
        <AdminNav />
      }
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (myNotices) {
      let tmpCount = myNotices.filter(function(x){return x.beforeOpen}).length;
      setCountNotice(tmpCount)
    }
  }, [myNotices])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap> */}
          <div
            classes={classes.cursorPointer}
          >
            <img
              onClick={() => history.push(`${paths.root}`)} 
              src={BetMeLogo} 
              height='40' 
            />
          </div>
          {/* </Typography> */}
          <div className={classes.menuButtonRight}>
            <IconButton aria-label="show 17 new notifications" color="inherit"
              onClick={() => history.push(`${paths.noticelist}`)}
            >
              <Badge badgeContent={countNotice} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => history.push(`${paths.myaccount}`)}>アカウント設定</MenuItem>
              { currentUser ? (
                <MenuItem onClick={handleSignout}>ログアウト</MenuItem>
              ):(
                <MenuItem onClick={() => history.push({pathname: `${paths.signin}`})}>ログイン</MenuItem>
              )
              }
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <>
          <Container maxWidth="md">
            {nickName &&
              <AppLogin nickName={nickName} />
            }
            {props.children}
          </Container>
        </>
        <AppAlert />
        <footer className={classes.footer} >
          &copy; 2020 Signal & Company
        </footer>
      </main>
    </div>
  )
}

AppLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


export default AppLayout;
