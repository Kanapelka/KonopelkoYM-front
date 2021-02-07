import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import './login-page.styles.sass';


interface LoginFormProps {
  onLoginChange: React.ChangeEventHandler;
  onPasswordChange: React.ChangeEventHandler;
  onLoginClick: React.MouseEventHandler;
}

const emailIconAdornment = <InputAdornment position="end"><EmailIcon /></InputAdornment>;
const passwordIconAdornment = <InputAdornment position="end"><LockOutlinedIcon /></InputAdornment>;

function LoginForm({ onLoginChange, onPasswordChange, onLoginClick }: LoginFormProps) {
  function customSubmitEvent(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <form onSubmit={customSubmitEvent} className="login-form">
      <TextField
        onChange={onLoginChange}
        className="login-text-field"
        label="Почта"
        InputProps={{ endAdornment: emailIconAdornment }}
      />
      <TextField
        onChange={onPasswordChange}
        className="login-text-field"
        label="Пароль"
        type="password"
        InputProps={{ endAdornment: passwordIconAdornment }}
      />
      <div className="sign-in-buttons-wrapper">
        <Button type="submit" onClick={onLoginClick} className="sign-in-button" color="primary">
          Вход
        </Button>
        <div id="google-sign-in" className="sign-in-with-google-button" />
      </div>
    </form>
  );
}

export default LoginForm;
