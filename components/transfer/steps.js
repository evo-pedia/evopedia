// react
import { useState } from 'react';

// @material-ui core
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// local
import QuantityForm from './quantity_form';
import Review from './review';
import FormSuccess from '../form_success';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: '8px',
  },
}));

function getSteps() {
  const steps = ['Kuantiti', 'Ulasan Transfer'];

  return steps;
}

function getStepContent({ activeStep, ...contents }) {
  switch (activeStep) {
    case 0:
      return <QuantityForm {...contents} />;
    case 1:
      return <Review {...contents} />;
    default:
      return 'Step tidak ada!';
  }
}

export default function TransferSteps() {
  const classes = useStyles();
  const steps = getSteps();

  const [activeStep, setActiveStep] = useState(0);
  const [type, setType] = useState('');
  const [total, setTotal] = useState('');
  const [recipient, setRecipient] = useState('');

  // just two types if needed, refactor this
  const changeType = type === 'peds' ? 'PED Poin' : 'Voucher';

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleType = (newType) => {
    setType(newType);
  };

  const handleTotal = (newTotal) => {
    setTotal(newTotal);
  };

  const handleRecipient = (newRecipient) => {
    setRecipient(newRecipient);
  };

  // for getStepContent
  const contents = {
    positiveClick: handleNext,
    negativeClick: handleBack,
    activeStep,
    type,
    total,
    handleType,
    handleTotal,
    handleRecipient,
  };

  return (
    <Paper className={classes.paper} elevation={5}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider />
      {activeStep === steps.length ? (
        <FormSuccess>
          <Typography>
            Anda telah mentransfer
            <b>{` ${changeType} `}</b>
            sejumlah
            <b>{` ${total} `}</b>
            kepada
            <b>{` ${recipient} `}</b>
          </Typography>
        </FormSuccess>
      ) : (
        getStepContent(contents)
      )}
    </Paper>
  );
}
