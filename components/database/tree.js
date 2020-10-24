// react
import { useState } from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
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
import TreeInset from './tree_inset';
import TreeDoubleInset from './tree_double_inset';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  rounded: {
    borderRadius: '8px',
  },
}));

function getLevels(level1, level2) {
  let struct = [
    {
      id: 1,
      ...(level1[0] && { headData: level1[0] }),
    },
  ];

  if (level1.length > 1) {
    struct = [
      ...struct,
      {
        id: 2,
        headData: level1[1],
      },
    ];
  }

  if (level2.length) {
    for (let i = 0; i < level1.length; i += 1) {
      let firstChild = false;
      let secondChild = false;
      for (let j = 0; j < level2.length; j += 1) {
        if (level2[j].parent === level1[i].username) {
          if (!firstChild) {
            firstChild = true;
            struct[i].firstChild = level2[j];
            continue;
          }

          if (!secondChild) {
            secondChild = true;
            struct[i].secondChild = level2[j];
          }
        }
      }
    }
  }

  return struct;
}

export default function Tree({ head, level1, level2 }) {
  const classes = useStyles();
  const levels = getLevels(level1, level2);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDisablePlus = ({ status }) => {
    if (status === 'anaknya penuh brok') return true;
    return false;
  };

  return (
    <Paper className={clsx(classes.paper, classes.rounded)} elevation={5}>
      <List>
        <ListItem className={classes.rounded}>
          <TreeData {...head} noAvatarColor disablePlus={level1.length > 1} />
          {open ? (
            <>
              {level1.length ? (
                <IconButton onClick={handleToggle}>
                  <ExpandLessIcon />
                </IconButton>
              ) : null}
            </>
          ) : (
            <>
              {level1.length ? (
                <IconButton onClick={handleToggle}>
                  <ExpandMoreIcon />
                </IconButton>
              ) : null}
            </>
          )}
        </ListItem>
        {level1.length ? (
          <Collapse in={open} timeout="auto" unmountOnExit>
            {levels.map(({ id, headData, firstChild, secondChild }) => (
              <TreeInset
                key={id}
                {...headData}
                disablePlus={handleDisablePlus(headData)}>
                {firstChild && (
                  <TreeDoubleInset
                    {...firstChild}
                    disablePlus={handleDisablePlus(firstChild)}
                  />
                )}
                {secondChild && (
                  <TreeDoubleInset
                    {...secondChild}
                    disablePlus={handleDisablePlus(secondChild)}
                  />
                )}
              </TreeInset>
            ))}
          </Collapse>
        ) : null}
      </List>
    </Paper>
  );
}

Tree.propTypes = {
  head: PropTypes.object.isRequired,
  level1: PropTypes.array.isRequired,
  level2: PropTypes.array.isRequired,
};
