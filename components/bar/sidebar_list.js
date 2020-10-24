// react
import { useEffect, useState } from 'react';

// next
import Link from 'next/link';

// @material-ui core
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import AktivasiIcon from '@material-ui/icons/Check';
import AdministrasiIcon from '@material-ui/icons/MenuBook';
import HistoryIcon from '@material-ui/icons/History';
import DatabaseIcon from '@material-ui/icons/Storage';
import GiftIcon from '@material-ui/icons/CardGiftcard';
import PlaneIcon from '@material-ui/icons/Send';
import TvIcon from '@material-ui/icons/Tv';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// nookies
import { parseCookies } from 'nookies';
import { Button } from '@material-ui/core';
import { Smartphone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  button: {
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
  },
}));

export default function SidebarList({open}) {
  const classes = useStyles();
  const [openAdministrasi, setOpenAdministrasi] = useState(false);
  const [username, setUsername] = useState('');

  const handleClickAdministrasi = () => {
    setOpenAdministrasi(!openAdministrasi);
  };

  useEffect(() => {
    const cookies = parseCookies();
    const { evopediaUsername } = cookies;
    setUsername(evopediaUsername);
  }, []);

  return (
    <List>
      <Link href="/dashboard">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link href={`/database?username=${username}`}>
        <ListItem button>
          <ListItemIcon>
            <DatabaseIcon />
          </ListItemIcon>
          <ListItemText primary="Database" />
        </ListItem>
      </Link>
      <Link href="/reward">
        <ListItem button>
          <ListItemIcon>
            <GiftIcon />
          </ListItemIcon>
          <ListItemText primary="Reward" />
        </ListItem>
      </Link>
      <Link href="/channel">
        <ListItem button>
          <ListItemIcon>
            <TvIcon />
          </ListItemIcon>
          <ListItemText primary="Channel" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/activation">
        <ListItem button>
          <ListItemIcon>
            <AktivasiIcon />
          </ListItemIcon>
          <ListItemText primary="Aktivasi" />
        </ListItem>
      </Link>
      <ListItem button onClick={handleClickAdministrasi}>
        <ListItemIcon>
          <AdministrasiIcon />
        </ListItemIcon>
        <ListItemText primary="Administrasi" />
        {openAdministrasi ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={openAdministrasi} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/transfer">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <PlaneIcon />
              </ListItemIcon>
              <ListItemText primary="Transfer" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      <Link href="/history">
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Riwayat" />
        </ListItem>
      </Link>
      <Link href="https://drive.google.com/file/d/1HWIf8EZEPzL2XxRtrufYTF1K9zGpJUpu/view?usp=sharing">
        <ListItem button>
          <ListItemIcon>
            <a target="_blank" className={classes.button}>
              <Smartphone />
            </a>
          </ListItemIcon>
          <ListItemText primary="APK beta ver. 2.0.4" />
        </ListItem>
      </Link>
    </List>
  );
}
