import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import LoginForm from './login-form.component';
import Constants from '../Constatns';
import UserInfo from '../shared/models/UserInfo';
import Http, { HttpStatus, Result } from '../services/http/Http';
import SignInApiRequest from '../services/authorization/SignInApiRequest';
import LocalStorageService from '../services/LocalStorageService';
import SnackBarAlert from '../shared/snack-bar-alert/snack-bar-alert.component';

import './login-page.styles.sass';


interface LoginCardProps {
  signInWithGoogle: Function;
}

type LoginFormState = {
  login: string;
  password: string;
  error: boolean;
  message?: string;
}

function LoginCard({ signInWithGoogle }: LoginCardProps) {
  const history = useHistory<History>();
  const [state, setState] = useState<LoginFormState>({ login: '', password: '', error: false });

  function onLoginChange(event: React.ChangeEvent<HTMLInputElement>) {
    state.login = event.target.value;
    setState(state);
  }

  function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    state.password = event.target.value;
    setState(state);
  }

  function onSnackBarClose() {
    state.error = false;
    setState({ ...state });
  }

  async function onLoginClick() {
    const signInRequest = new SignInApiRequest(state.login, state.password);
    const result: Result<UserInfo> = await Http.Call<UserInfo>(signInRequest);
    switch (result.status) {
      case HttpStatus.Ok:
        LocalStorageService.PutToStorage<UserInfo>(Constants.LocalStorage.USER, result.payload);
        history.push(Constants.Urls.Pages.DASHBOARDS);
        break;
      case HttpStatus.NotFound:
        state.error = true;
        state.message = 'Пользователь не найден. Пожалуйста, проверьте почту и пароль и поробуйте ещё раз';
        setState({ ...state });
        break;
      default:
        state.error = true;
        state.message = 'Произошла неизвестная ошибка. Пожалуйста, обратитесь в поддержку.';
        setState({ ...state });
        break;
    }
  }

  function initGoogleSignIn() {
    const params = {
      onsuccess: signInWithGoogle,
    };

    // @ts-ignore
    window.gapi.load('signin2', () => {
      // @ts-ignore
      window.gapi.signin2.render('google-sign-in', params);
    });
  }

  useEffect(() => { initGoogleSignIn(); }, []);

  return (
    <>
      <Card className="login-card">
        <CardHeader title="Форма входа" />
        <LoginForm
          onLoginChange={onLoginChange}
          onPasswordChange={onPasswordChange}
          onLoginClick={onLoginClick}
        />
        <CardActions>
          <Link className="sign-up-text" to={Constants.Urls.Pages.SIGN_UP}>
            Нет аккаунта? Зарегистрируйтесь!
          </Link>
        </CardActions>
      </Card>
      <SnackBarAlert
        message={state.message}
        severity="error"
        onClose={onSnackBarClose}
        open={state.error}
      />
    </>
  );
}

export default LoginCard;
