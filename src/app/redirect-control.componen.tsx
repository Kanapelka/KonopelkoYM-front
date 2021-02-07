import React from 'react';
import { withRouter } from 'react-router-dom';

import LocalStorageService from './services/LocalStorageService';
import Constants from './Constatns';
import UserInfo from './shared/models/UserInfo';
import { HttpStatus } from './services/http/Http';


type RedirectControlProps = {
  children: React.ReactNode;
  history: any;
}

async function validateUserCurrentProfile(user: UserInfo): Promise<number> {
  const url = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/users/${user.userId}`;
  const options = { headers: { Authorization: `Bearer ${user.token}` } };
  const response = await fetch(url, options);
  return response.status;
}

class RedirectControl extends React.Component<RedirectControlProps> {
  async componentDidCatch() {
    const { history } = this.props;
    const currentUser = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);

    if (!currentUser) {
      history.push(Constants.Urls.Pages.SIGN_IN);
      return;
    }

    const result = await validateUserCurrentProfile(currentUser);
    switch (result) {
      case HttpStatus.Ok:
        history.push(Constants.Urls.Pages.ERROR_500);
        break;
      case HttpStatus.Unauthorized:
      case HttpStatus.NotFound:
        history.push(Constants.Urls.Pages.SIGN_IN);
        LocalStorageService.ClearStorage();
        break;
      default:
        history.push(Constants.Urls.Pages.SIGN_IN);
        LocalStorageService.ClearStorage();
        break;
    }
  }

  render(): React.ReactNode {
    if (!LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER)) {
      const { history } = this.props;
      history.push(Constants.Urls.Pages.SIGN_IN);
      LocalStorageService.ClearStorage();
    }

    const { children } = this.props;
    return children;
  }
}

// @ts-ignore
export default withRouter(RedirectControl);
