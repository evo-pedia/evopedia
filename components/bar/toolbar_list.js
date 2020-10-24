// react
import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/router';

// @material-ui core
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

// nookies
import { parseCookies, destroyCookie } from 'nookies';

// prop-types
import PropTypes from 'prop-types';

// clsx
import clsx from 'clsx';

// utils
import { getFirstCharacter } from '../../utils/data_helper';

const useStyles = makeStyles((theme) => ({
  avatar: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  avatarAccent: {
    backgroundColor: theme.palette.accent.main,
    marginRight: '1em',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
}));

export default function ToolbarList({ open, drawerOpen }) {
  const classes = useStyles();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const dropdownOpen = Boolean(anchorEl);

  const [username, setUsername] = useState('');

  const handleDrawerOpen = () => {
    drawerOpen(true);
  };

  const handleDropdownOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    destroyCookie(null, 'evopediaLoginSecure');
    destroyCookie(null, 'evopediaRole');
    destroyCookie(null, 'evopediaUsername');
    router.push('/login');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  useEffect(() => {
    const cookies = parseCookies();
    const { evopediaUsername } = cookies;
    setUsername(evopediaUsername);
  }, []);

  return (
    <>
      <IconButton
        edge="start"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        className={clsx(classes.menuButton, open && classes.hide)}>
        <MenuIcon />
      </IconButton>
      <div className={clsx(classes.avatar, open && classes.hide)}>
        <Avatar className={classes.avatarAccent}>
          {getFirstCharacter(username)}
        </Avatar>
        {!open && (
          <>
            <Typography variant="h6">{username}</Typography>
            <IconButton color="secondary" onClick={handleDropdownOpen}>
              {!dropdownOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={dropdownOpen}
              onClose={handleDropdownClose}
              style={{ marginTop: '4em' }}
              keepMounted>
              <MenuItem onClick={handleProfileClick}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <PersonIcon />
                  </Grid>
                  <Grid item xs={8}>
                    Profile
                  </Grid>
                </Grid>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <PowerSettingsNewIcon />
                  </Grid>
                  <Grid item xs={8}>
                    Log Out
                  </Grid>
                </Grid>
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </>
  );
}

ToolbarList.propTypes = {
  open: PropTypes.bool.isRequired,
  drawerOpen: PropTypes.func.isRequired,
};
