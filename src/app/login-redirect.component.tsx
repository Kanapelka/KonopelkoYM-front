import React from 'react';
import { useHistory } from 'react-router-dom';

import { IParenComponentProps } from './shared/Props';
import LocalStorageService from './services/LocalStorageService';
import UserInfo from './shared/models/UserInfo';
import Constants from './Constatns';


function LoginRedirect({ children }: IParenComponentProps) {
  const history = useHistory();

  const user = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
  if (user) {
    history.push(Constants.Urls.Pages.DASHBOARDS);
  }

  return <>{children}</>;
}

export default LoginRedirect;
