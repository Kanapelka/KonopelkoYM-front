import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import InputError from './input-error';


interface BlurredTextFieldProps {
  onChange: ChangeEventHandler;
  onBlur: MouseEventHandler<Document>;
  placeholder?: string;
  label?: string;
  inputError?: InputError;
  icon?: JSX.Element;
  className?: string;
  required?: boolean;
  type?: string;
}

function BlurredTextField({
  onChange,
  inputError,
  onBlur, icon,
  className,
  label,
  placeholder,
  required,
  type,
}: BlurredTextFieldProps) {
  return (
    <ClickAwayListener onClickAway={onBlur}>
      <TextField
        type={type}
        required={required}
        label={label}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        error={inputError?.error}
        helperText={inputError?.error ? inputError?.message : undefined}
        InputProps={{ endAdornment: icon }}
      />
    </ClickAwayListener>
  );
}

export default BlurredTextField;
