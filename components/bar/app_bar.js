// react
import { useState } from 'react';

// @material-ui core
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// clsx
import clsx from 'clsx';

// local
import SidebarList from './sidebar_list';
import ToolbarList from './toolbar_list';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // biar ada
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 10px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  hide: {
    display: 'none',
  },
}));

export default function AppDrawer() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  // hide and show seperempat
  const paperFusion = {
    paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
  };

  const handleDrawerOpen = (bool) => {
    setOpenDrawer(bool);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <ToolbarList open={openDrawer} drawerOpen={handleDrawerOpen} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={openDrawer} classes={paperFusion}>
        <div className={classes.toolbarIcon}>
          {openDrawer && (
            <img src="evopedia_logo.png" alt="Evopedia" width="50px" />
          )}
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <SidebarList open={openDrawer}/>
      </Drawer>
    </>
  );
}
