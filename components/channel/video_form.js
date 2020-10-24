// react
import { useState } from 'react';

// next
import Link from 'next/link';
import { useRouter } from 'next/router';

// @material-ui core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

// formik
import { Formik, Form, FieldArray } from 'formik';

// prop-types
import PropTypes from 'prop-types';

// lib
import { CHANNEL } from '../../lib/links';

// utils
import { TextFieldWithErr } from '../../utils/form_helper';
import { channelLinksValidationSchema } from '../../utils/yup_validation';
import { postFetcher, getClientToken } from '../../utils/data_helper';

const useStyles = makeStyles((theme) => ({
  form: {
    paddingTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
  },
  link: {
    color: theme.palette.primary.main,
  },
}));

// add and save button component, I should move this to a new file
// but instead moving, I added this on top of the exported function
// just to make sure it is clean on Formik component
function AddAndSaveVideos({
  addField,
  arrayHelpers,
  values,
  isSubmitting,
  totalVideos,
}) {
  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => addField(arrayHelpers, values.videos)}
          disabled={values.videos.length === totalVideos}
          fullWidth>
          Tambah Video
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          fullWidth>
          Simpan
        </Button>
        {isSubmitting && <LinearProgress />}
      </Grid>
    </Grid>
  );
}

AddAndSaveVideos.propTypes = {
  addField: PropTypes.func.isRequired,
  arrayHelpers: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  totalVideos: PropTypes.number.isRequired,
};

// I also moved the info details because it made the code dirty below the grid
// if you want to create the file, feel free to do it. ( Just want to make you
// not confused about this. )
function VideoMaxInfo({ className, totalVideos }) {
  return (
    <>
      <Typography gutterBottom>
        Anda memiliki
        <b>{` ${totalVideos} `}</b>
        video untuk ditampilkan
      </Typography>
      <Typography gutterBottom>
        <Link href="/activation">
          <a className={className}>Klik disini</a>
        </Link>
        {' untuk aktivasi'}
      </Typography>
    </>
  );
}

VideoMaxInfo.propTypes = {
  className: PropTypes.string.isRequired,
  totalVideos: PropTypes.number.isRequired,
};

export default function VideoForm({ totalVideos, vidList }) {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const initialValues = {
    videos: !vidList.length
      ? [
          {
            id: 1,
            video: '',
          },
        ]
      : vidList,
  };

  const handleSubmit = async (data, { setSubmitting }) => {
    const { videos } = data;
    const mapped = videos.map(({ video }) => ({
      video,
    }));

    const token = getClientToken();
    const postData = await postFetcher(CHANNEL, mapped, token);

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);

    if (postData.message === 'Link Video berhasil di tambahkan') {
      router.reload();
    }
  };

  const handleAddField = (arrayHelpers, items) => {
    if (items.length <= totalVideos) {
      arrayHelpers.push({
        id: items[items.length - 1].id + 1,
        video: '',
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validationSchema={channelLinksValidationSchema}>
      {({ values, isSubmitting }) => (
        <Form className={classes.form}>
          <FieldArray name="videos">
            {(arrayHelpers) => (
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} md={6}>
                  <AddAndSaveVideos
                    addField={handleAddField}
                    arrayHelpers={arrayHelpers}
                    values={values}
                    isSubmitting={isSubmitting}
                    totalVideos={totalVideos}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <VideoMaxInfo
                    className={classes.link}
                    totalVideos={totalVideos}
                  />
                </Grid>
                {values.videos.map((video, idx) => (
                  <Grid
                    item
                    xs={12}
                    md={values.videos.length % 2 === 0 ? 6 : 12}
                    key={video.id}>
                    <TextFieldWithErr
                      label="Link video"
                      name={`videos.${idx}.video`}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
}

VideoForm.propTypes = {
  totalVideos: PropTypes.number.isRequired,
  vidList: PropTypes.array.isRequired,
};
