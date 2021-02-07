import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import SignUpForm from './form/sign-up-form.component';
import Constants from '../Constatns';

import './sign-up-form.styles.sass';


function SignUpCard() {
  return (
    <Card className="sign-up-card">
      <CardHeader title="Форма регистрации" />
      <CardContent>
        <SignUpForm />
      </CardContent>
      <p className="sign-in-link-text">
        Уже есть аккаунт?
        <Link to={Constants.Urls.Pages.SIGN_IN}> Авторизируйтесь!</Link>
      </p>
    </Card>
  );
}

export default SignUpCard;
