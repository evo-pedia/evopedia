// react
import { useState } from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

// prop-types
import PropTypes from 'prop-types';

// clsx
import clsx from 'clsx';

// local
import Table from './table';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  large: {
    fontSize: '2.5rem',
  },
  bold: {
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
    },
  },
  rounded: {
    borderRadius: '8px',
  },
}));

export default function HistoryList({ title, desc, type }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Paper className={clsx(classes.paper, classes.rounded)} elevation={5}>
      <List>
        <ListItem button onClick={handleToggle} className={classes.rounded}>
          <ListItemText
            primary={title}
            secondary={desc}
            primaryTypographyProps={{
              variant: 'h5',
            }}
            secondaryTypographyProps={{
              variant: 'overline',
            }}
            className={classes.bold}
          />
          {open ? (
            <ExpandLessIcon className={classes.large} />
          ) : (
            <ExpandMoreIcon className={classes.large} />
          )}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Table type={type} />
        </Collapse>
      </List>
    </Paper>
  );
}

HistoryList.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['transfer', 'komisi', 'aktivasi']).isRequired,
};
