// @material-ui core
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

// clsx
import clsx from 'clsx';

// prop-types
import PropTypes from 'prop-types';

// local
import TreeData from './tree_data';

export default function TreeDoubleInset({ position: classType, ...props }) {
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
        margin: theme.spacing(3, 0, 0, 11),
        padding: theme.spacing(1),
      },
    },
    rounded: {
      borderRadius: '8px',
    },
  }));
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.paper, classes.rounded)} elevation={15}>
      <List>
        <ListItem className={classes.rounded}>
          <TreeData position={classType} {...props} />
        </ListItem>
      </List>
    </Paper>
  );
}

TreeDoubleInset.propTypes = {
  position: PropTypes.string.isRequired,
};
