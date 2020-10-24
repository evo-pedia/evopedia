// react
import { useState } from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

// clsx
import clsx from 'clsx';

// prop-types
import PropTypes from 'prop-types';

// local
import TreeData from './tree_data';

export default function TreeInset({ position: classType, children, ...props }) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      color: theme.palette.common.white,
      backgroundColor:
        classType === '1'
          ? theme.palette.primary.main
          : theme.palette.accent.main,
      [theme.breakpoints.up('xs')]: {
        margin: theme.spacing(3),
      },
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(3, 0, 0, 9),
        padding: theme.spacing(1),
      },
    },
    rounded: {
      borderRadius: '8px',
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Paper className={clsx(classes.paper, classes.rounded)} elevation={5}>
      <List>
        <ListItem className={classes.rounded}>
          <TreeData position={classType} {...props} />
          {open ? (
            <>
              {children[0] !== undefined ? (
                <IconButton onClick={handleToggle}>
                  <ExpandLessIcon />
                </IconButton>
              ) : null}
            </>
          ) : (
            <>
              {children[0] !== undefined ? (
                <IconButton onClick={handleToggle}>
                  <ExpandMoreIcon />
                </IconButton>
              ) : null}
            </>
          )}
        </ListItem>
        {children ? (
          <Collapse in={open} timeout="auto" unmountOnExit>
            {children}
          </Collapse>
        ) : null}
      </List>
    </Paper>
  );
}

TreeInset.propTypes = {
  position: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};
