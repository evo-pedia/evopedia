// react
import { useEffect, useState } from 'react';

// @material-ui core
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// mui-datatables
import DataTable from 'mui-datatables';

// lib
import * as TransferIn from '../../lib/riwayat/transfer_in';
import * as TransferOut from '../../lib/riwayat/transfer_out';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function BottomPanels() {
  const classes = useStyles();
  const [inLib, setInLib] = useState({});
  const [outLib, setOutLib] = useState({});

  useEffect(() => {
    const getInLib = async () => {
      setInLib({
        ...TransferIn,
        data: await TransferIn.getData(),
      });
    };

    const getOutLib = async () => {
      setOutLib({
        ...TransferOut,
        data: await TransferOut.getData(),
      });
    };

    getInLib();
    getOutLib();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Paper className={classes.paper} elevation={5}>
          <DataTable {...inLib} />
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={classes.paper} elevation={5}>
          <DataTable {...outLib} />
        </Paper>
      </Grid>
    </Grid>
  );
}
