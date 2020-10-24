// react
import { useState } from 'react';

// @material-ui core
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

// @material-ui icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

// formik
import { useField } from 'formik';

// prop-types
import PropTypes from 'prop-types';

export function TextFieldWithErr({
  label,
  type,
  uppercased,
  disabled,
  ...props
}) {
  // hooks
  const [field, meta] = useField(props);
  const [visible, setVisible] = useState(false);

  // metas
  const { error, touched, value } = meta;
  const errorText = error && touched ? error : '';

  // password thing
  const showPass = visible ? 'text' : 'password';
  const showEye = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setVisible(!visible)}>
          {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <TextField
      {...field}
      variant="outlined"
      margin="dense"
      label={label}
      disabled={disabled}
      helperText={errorText}
      error={!!errorText}
      value={uppercased ? value.toUpperCase() : value}
      type={type === 'password' ? showPass : type}
      InputProps={type === 'password' ? showEye : {}}
      fullWidth
    />
  );
}

TextFieldWithErr.defaultProps = {
  type: 'text',
  uppercased: false,
  disabled: false,
};

TextFieldWithErr.propTypes = {
  label: PropTypes.string.isRequired,
  uppercased: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export function SelectWithErr({ label, children, ...props }) {
  const [field, meta] = useField(props);
  const { error, touched, value } = meta;
  const errorText = error && touched ? error : '';

  return (
    <FormControl
      variant="outlined"
      margin="dense"
      error={!!errorText}
      fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select {...field} value={value} label={label}>
        {children}
      </Select>
      {!!errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
}

SelectWithErr.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export function CheckboxWithErr({ label, ...props }) {
  const [field, meta] = useField(props);
  const { error, touched } = meta;
  const errorText = error && touched ? error : '';

  return (
    <FormControl error={!!errorText}>
      <FormControlLabel
        {...field}
        control={<Checkbox color="primary" />}
        label={label}
      />
      {!!errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
}

CheckboxWithErr.propTypes = {
  label: PropTypes.string.isRequired,
};

export function RadioWithErr({ label, disabled, ...props }) {
  const [field, meta] = useField(props);
  const { error, touched } = meta;
  const errorText = error && touched ? error : '';

  return (
    <FormControl error={!!errorText}>
      <FormControlLabel
        {...field}
        control={<Radio color="primary" />}
        label={label}
        disabled={disabled}
      />
      {!!errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
}

RadioWithErr.defaultProps = {
  disabled: false,
};

RadioWithErr.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export function Emoji({ icon }) {
  return (
    <span role="img" aria-labelledby="emoji">
      {icon}
    </span>
  );
}

Emoji.propTypes = {
  icon: PropTypes.string.isRequired,
};
