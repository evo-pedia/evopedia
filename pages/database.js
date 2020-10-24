// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// locals
import SEO from '../components/seo';
import Layout from '../components/layout';

// components
import Search from '../components/database/search';
import Tree from '../components/database/tree';

// lib
import { DATABASE, TERLUAR } from '../lib/links';

// utils
import { getClientToken, getFetcher, getToken } from '../utils/data_helper';
import { Button, DialogContentText, LinearProgress } from '@material-ui/core';
import { useState } from 'react';
import Modal from '../components/modal';
import NewStudentForm from '../components/database/new_student_form';

export default function Database({ ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState({register: false, info: false});
  const [info, setInfo] = useState({anak_kiri_luar: "", anak_kanan_luar: ""});

  const handleGetChild = async () => {
    setIsLoading(true);
    const token = getClientToken();
    const data = await getFetcher(TERLUAR, token);

    setInfo(data);

    setOpen({info: true});

    setIsLoading(false);
  };

  const handleModalClose = () => {
    setOpen({info: false, register: false});
  }

  return (
    <>
      <SEO title="Database" />
      <Layout>
        <Grid container direction="row">
          <Grid item xs>
            <Typography variant="h3" gutterBottom>
              <b>Database</b>
            </Typography>
          </Grid>
          <Grid item xs>
          <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading}
              onClick={() => setOpen({register: true})}
              fullWidth
            >
              Daftar
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="column">
          <Grid item xs>
            <Search />
          </Grid>
          <Grid item xs>
            <Tree {...props} />
          </Grid>
          <Grid item xs>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading}
              onClick={handleGetChild}
              fullWidth
            >
              Lihat Follower terbaru
            </Button>
            {isLoading && <LinearProgress />}
          </Grid>
        </Grid>
      </Layout>
      <Modal
        open={open.register}
        onClose={handleModalClose}
        title="Register New Follower">
        <DialogContentText>
          Data yang digunakan wajib dapat dipertanggungjawabkan!
        </DialogContentText>
        <NewStudentForm
          negativeClick={handleModalClose}
          mentor={""}
          status={"status"}
          type="luar"
        />
      </Modal>
      <Modal
        open={open.info}
        onClose={handleModalClose}
        title="Follower Terbaru"
        >
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h6">
              Student A: {info.anak_kiri_luar}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Student B: {info.anak_kanan_luar}
            </Typography>
          </Grid>
        </Grid> 
      </Modal>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const token = getToken(ctx);
  const { username } = ctx.query;
  const database = await getFetcher(`${DATABASE}${username}/`, token);

  const head = database[0];
  const level1 = [];
  const level2 = [];

  // TODO: refactor this later
  for (let i = 1; i < database.length; i += 1) {
    if (database[i].level === head.level + 1) {
      level1.push(database[i]);
    }

    if (database[i].level === head.level + 2) {
      level2.push(database[i]);
    }
  }

  return {
    props: {
      head,
      level1,
      level2,
    },
  };
}