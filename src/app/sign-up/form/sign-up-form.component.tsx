import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import * as icons from './input-adornment';
import BlurredTextField from '../../shared/blurred-text-field/blurred-text-field.component';
import SignUpFormState from './sign-up-form-state';
import SignUpValidationService from '../../services/SignUpValidationService';
import SnackBarAlert from '../../shared/snack-bar-alert/snack-bar-alert.component';
import User from '../../shared/models/User';
import UserInfo from '../../shared/models/UserInfo';
import Http, { HttpStatus } from '../../services/http/Http';
import SignUpApiRequest from '../../services/authorization/SignUpApiRequest';

import '../sign-up-form.styles.sass';
import LocalStorageService from '../../services/LocalStorageService';
import Constants from '../../Constatns';


function SignUpForm() {
  const history = useHistory();
  const [state, setState] = useState(new SignUpFormState());

  function onSubmitInner(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  function disableConfirmButton(): boolean {
    const {
      emailAddress, password, confirmPassword, firstName, lastName,
      emailError, passwordError, confirmPasswordError, firstNameError, lastNameError,
    } = state;

    const noErrors: boolean = !emailError?.error
      && !passwordError?.error
      && !confirmPasswordError?.error
      && !firstNameError?.error
      && !lastNameError?.error;

    const allFieldAreFilled: boolean = emailAddress?.length !== 0
      && password?.length !== 0
      && confirmPassword?.length !== 0
      && firstName?.length !== 0
      && lastName?.length !== 0;

    return !(noErrors && allFieldAreFilled);
  }

  function onEmailAddressChange(event: ChangeEvent<HTMLInputElement>): void {
    state.emailAddress = event.target.value;
    setState({ ...state });
  }

  function onEmailAddressBlur(): void {
    const { emailAddress } = state;
    if (emailAddress?.length === 0) {
      state.emailError.error = false;
      setState({ ...state });
      return;
    }

    state.emailError.error = !SignUpValidationService.ValidateEmailAddress(emailAddress);
    state.emailError.message = 'Почта введена некорректно!';
    setState({ ...state });
  }

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    state.password = event.target.value;
    setState({ ...state });
  }

  function onPasswordBlur(): void {
    const { password } = state;
    if (password?.length === 0) {
      state.passwordError.error = false;
      setState({ ...state });
      return;
    }

    state.passwordError.error = !SignUpValidationService.ValidatePasswordIsStrong(password);
    // eslint-disable-next-line max-len
    state.passwordError.message = 'Пароль должен состоять хотя бы из 8 символов, а так же включать цифры и заглавные буквы!';
    setState({ ...state });
  }

  function onConfirmPasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    state.confirmPassword = event.target.value;
    setState({ ...state });
  }

  function onConfirmPasswordBlur() {
    const { confirmPassword, password } = state;
    if (confirmPassword?.length === 0) {
      state.confirmPasswordError.error = false;
      setState({ ...state });
    }

    state.confirmPasswordError.error = password !== confirmPassword;
    state.confirmPasswordError.message = 'Пароли не совпадают!';
    setState({ ...state });
  }

  function onFirstNameChange(event: ChangeEvent<HTMLInputElement>): void {
    state.firstName = event.target.value;
    setState({ ...state });
  }

  function onLastNameChange(event: ChangeEvent<HTMLInputElement>): void {
    state.lastName = event.target.value;
    setState({ ...state });
  }

  function onJobTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    state.jobTitle = event.target.value;
    setState({ ...state });
  }

  function onLocationChange(event: ChangeEvent<HTMLInputElement>): void {
    state.location = event.target.value;
    setState({ ...state });
  }

  function onSnackBarClose() {
    state.openAlert = false;
    setState({ ...state });
  }

  async function onSignUpClick() {
    const user: User = new User(
      0, state.firstName, state.lastName, state.emailAddress, state.password, true, state.jobTitle, state.location,
    );

    const result = await Http.CallWithBody<UserInfo, User>(new SignUpApiRequest(user));
    switch (result.status) {
      case HttpStatus.BadRequest:
        state.openAlert = true;
        state.alertMessage = 'Пользователь с такой почтой уже сущестует.';
        setState({ ...state });
        break;
      case HttpStatus.Ok:
      case HttpStatus.Created:
        LocalStorageService.PutToStorage<UserInfo>(Constants.LocalStorage.USER, result.payload);
        history.push(Constants.Urls.Pages.DASHBOARDS);
        break;
      default:
        state.openAlert = true;
        state.alertMessage = 'Произошла неизвестная ошибка. Пожалуйста, обратитесь в поддержку.';
        setState({ ...state });
        break;
    }
  }

  return (
    <>
      <form className="sign-up-form" onSubmit={onSubmitInner}>
        <div className="sign-up-input-section-wrapper">
          <div className="sign-up-input-section">
            <BlurredTextField
              required
              label="Почта"
              className="sign-up-text-input"
              inputError={state.emailError}
              onChange={onEmailAddressChange}
              onBlur={onEmailAddressBlur}
              icon={icons.emailIconAdornment}
            />
            <BlurredTextField
              required
              label="Пароль"
              type="password"
              className="sign-up-text-input"
              inputError={state.passwordError}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
              icon={icons.passwordIconAdornment}
            />
            <BlurredTextField
              required
              label="Подтверждение пароля"
              type="password"
              className="sign-up-text-input"
              inputError={state.confirmPasswordError}
              onChange={onConfirmPasswordChange}
              onBlur={onConfirmPasswordBlur}
              icon={icons.confirmPasswordIconAdornment}
            />
          </div>
          <div className="sign-up-input-section">
            <BlurredTextField
              required
              label="Имя"
              className="sign-up-text-input"
              inputError={state.firstNameError}
              onChange={onFirstNameChange}
              onBlur={() => {}}
              icon={icons.personIconAdornment}
            />
            <BlurredTextField
              required
              label="Фамилия"
              className="sign-up-text-input"
              inputError={state.lastNameError}
              onChange={onLastNameChange}
              onBlur={() => {}}
              icon={icons.personIconAdornment}
            />
            <div className="grouped-input-fields">
              <TextField
                label="Должность"
                className="option-text-input"
                onChange={onJobTitleChange}
                InputProps={{ endAdornment: icons.jobTitleIconAdornment }}
              />
              <TextField
                label="Местоположение"
                className="option-text-input"
                onChange={onLocationChange}
                InputProps={{ endAdornment: icons.locationIconAdornment }}
              />
            </div>
          </div>
        </div>
        <div className="sign-up-button-wrapper">
          <Button
            onClick={onSignUpClick}
            disabled={disableConfirmButton()}
            className="sign-up-button"
            color="primary"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <SnackBarAlert
        message={state.alertMessage}
        open={state.openAlert}
        onClose={onSnackBarClose}
        severity="error"
      />
    </>
  );
}

export default SignUpForm;
