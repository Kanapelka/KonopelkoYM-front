import React from 'react';
import { useHistory } from 'react-router-dom';

import PageBackground from '../shared/page-background/page-background.component';
import FullScreen from '../shared/full-screen/full-sreen.component';
import Container from '../shared/container/container.component';
import LoginCard from './login-card.component';
import LoginRedirect from '../login-redirect.component';

import * as imageUrl from '../../assets/login background image.jpg';
import './login-page.styles.sass';
import UserProfile from '../shared/models/UserProfile';
import Constants from '../Constatns';
import LocalStorageService from '../services/LocalStorageService';
import UserInfo from '../shared/models/UserInfo';


function LoginPage() {
  const history = useHistory();

  async function signInWithGoogle(googleProfile: any) {
    const googleBasicProfile = googleProfile.getBasicProfile();

    const emailAddress: string = googleBasicProfile.getEmail();
    const firstName: string = googleBasicProfile.getGivenName();
    const lastName: string = googleBasicProfile.getFamilyName();

    const athenaProfile = new UserProfile(0, firstName, lastName, emailAddress);

    const baseUrl: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}`;
    const url: string = `${baseUrl}/${Constants.Urls.Api.SIGN_IN_WITH_GOOGLE}`;

    const params: RequestInit = {
      method: 'POST',
      body: JSON.stringify(athenaProfile),
      headers: { 'Content-Type': 'application/json' },
    };

    const response: Response = await fetch(url, params);
    const user: UserInfo = await response.json();
    LocalStorageService.PutToStorage<UserInfo>(Constants.LocalStorage.USER, user);
    history.push(Constants.Urls.Pages.DASHBOARDS);
  }

  return (
    <LoginRedirect>
      <PageBackground imageUrl={imageUrl}>
        <FullScreen>
          <Container horizontal vertical>
            <LoginCard signInWithGoogle={signInWithGoogle} />
          </Container>
        </FullScreen>
      </PageBackground>
    </LoginRedirect>
  );
}

export default LoginPage;
