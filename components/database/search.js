// @material-ui core
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// local
import SearchForm from './search_form';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    borderRadius: '8px',
    textAlign: 'center',
  },
}));

export default function Search() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <SearchForm />
    </Paper>
  );
}
